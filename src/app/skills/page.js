'use client'
import { useState, useEffect } from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

import { fetchSkills } from '@/services/skillService'

const SkillsPage = () => {
    const [skills, setSkills] = useState([])
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchSkills().then(setSkills)
                   .catch((err) => setError(err.message))
                   .finally(() => setIsFetching(false))
    }, [])

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Skills</h1>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Tipo</TableHead>
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
                                    <Skeleton className="h-6 w-[70px] rounded-full" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-8 w-[80px]" />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        skills.map((skill) => (
                            <TableRow key={skill.id}>
                                <TableCell>{skill.name}</TableCell>
                                <TableCell>
                                    <Badge>{skill.type}</Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default SkillsPage
