'use client'
import { useState, useEffect } from 'react'

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import AddJobModal from '@/components/add-job-modal'
import RecommendationsModal from '@/components/recommendations-modal'
import { Skeleton } from '@/components/ui/skeleton'

import { fetchJobs, deleteJob, fetchRecommendations } from '@/services/jobsService'

const labels = {
    OPENED: 'Em aberto',
    FILLED: 'Preenchida',
    CLOSED: 'Fechada'
}

const JobsPage = ({}) => {
    const [jobs, setJobs] = useState([])
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState(null)

    const [recommendationType, setRecommendationType] = useState()

    const [recommendations, setRecommendations] = useState([])
    const [isFetchingRecommendations, setIsFetchingRecommendations] = useState(true)
    const [errorRecommendations, setErrorRecommendations] = useState(null)

    const [jobId, setJobId] = useState(null)

    useEffect(() => {
        fetchJobs().then(setJobs)
                   .catch((err) => setError(err.message))
                   .finally(() => setIsFetching(false))
    }, [])
    useEffect(() => {
        if (jobId && recommendationType) {
            fetchRecommendations(jobId, recommendationType).then(setRecommendations)
                   .catch((err) => setErrorRecommendations(err.message))
                   .finally(() => setIsFetchingRecommendations(false))
        }
    }, [jobId, recommendationType])

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Vagas internas</h1>
                <AddJobModal />
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Vaga</TableHead>
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
                        jobs.map((job, index) => (
                            <TableRow key={index}>
                                <TableCell>{job.title}</TableCell>
                                <TableCell>
                                    <ul>
                                        {job.skills.map((skill, index) => (
                                            <li key={index}>
                                                {skill.name}
                                            </li>
                                        ))}
                                    </ul>
                                </TableCell>
                                <TableCell>
                                    <RecommendationsModal jobTitle={job.title}
                                                          requiredSkills={job.skills}
                                                          handleOpenBtnClick={() => {setJobId(job.id); setRecommendationType('RELEVANCE')}}
                                                          isLoading={isFetchingRecommendations}
                                                          modalTitle={'Ver recomendações por relevância'}
                                                          {...{recommendations, recommendationType}}/>
                                    <RecommendationsModal jobTitle={job.title}
                                                          requiredSkills={job.skills}
                                                          handleOpenBtnClick={() => {setJobId(job.id); setRecommendationType('PROXIMITY')}}
                                                          isLoading={isFetchingRecommendations}
                                                          modalTitle={'Ver recomendações por compatibilidade'}
                                                          {...{recommendations, recommendationType}}/>
                                    {/* <Button variant="destructive" size="sm" onClick={() => deleteJob(job.id)}>
                                        Excluir
                                    </Button> */}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default JobsPage
