'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import AddProjectModal from '@/components/AddProjectModal'
import RecommendationsModal from '@/components/RecommendationsModal'
import { Skeleton } from '@/components/ui/skeleton'

import { fetchProjects, saveProject, deleteProject, fetchRecommendations } from '@/services/projectsService'

const labels = {
    OPENED: 'Em aberto',
    FILLED: 'Preenchida',
    CLOSED: 'Fechada'
}

const ProjectsPage = ({}) => {
    const [projects, setProjects] = useState([])
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchProjects().then(setProjects)
                   .catch((err) => setError(err.message))
                   .finally(() => setIsFetching(false))
    }, [])

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Projetos internos</h1>
                <AddProjectModal submit={saveProject}
                             onSuccess={(newProject) => setProjects((prev) => [...prev, newProject])}/>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Projeto</TableHead>
                        <TableHead>Skills requeridas</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isFetching ? (
                        Array.from({ length: 5 }).map((_, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <Skeleton className="h-4 w-[120px]" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-[120px]" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-[120px]" />
                                </TableCell>
                            </TableRow>
                    ))) : (
                        projects.map((project, index) => (
                            <TableRow key={index}>
                                <TableCell>{project.title}</TableCell>
                                <TableCell>
                                    <ul>
                                        {project.skills.map((skill, index) => (
                                            <li key={index}>
                                                {skill.name}
                                            </li>
                                        ))}
                                    </ul>
                                </TableCell>
                                <TableCell>
                                         <Link href={{ pathname: '/recommendations',
                                                       query: { recommendationType: 'PROXIMITY', projectId: project.id },
                                                    }}
                                               className="inline-flex items-center rounded-md border px-3 py-1 text-sm font-medium hover:bg-gray-100">
                                            Ver recomendações pro proximidade
                                        </Link>
                                         <Link href={{ pathname: '/recommendations',
                                                       query: { recommendationType: 'RELEVANCE', projectId: project.id },
                                                    }}
                                                className="inline-flex items-center rounded-md border px-3 py-1 text-sm font-medium hover:bg-gray-100">
                                            Ver recomendações pro relevância
                                        </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default ProjectsPage
