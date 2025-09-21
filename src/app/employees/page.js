// src/app/colaboradores/page.tsx
'use client'
import { useState, useEffect } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import SkillsModal from '@/components/skills-modal'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { fetchEmployees } from '@/services/employeeService'

const EmployeesPage = () => {
   
    const [employees, setEmployees] = useState([])
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState(null)

    const [skills, setSkills] = useState([])

    useEffect(() => {
        fetchEmployees().then(setEmployees)
                    .catch((err) => setError(err.message))
                    .finally(() => setIsFetching(false))
    }, [])

    useEffect(() => {
        if (employees.length > 0) {
            const skillsByEmployee = Object.fromEntries(
                employees.map(employee => [
                    employee.id,
                    {
                        SOFT: employee.skills.filter(s => s.type === 'SOFT'),
                        HARD: employee.skills.filter(s => s.type === 'HARD')
                    }
                ])
            );

            setSkills(skillsByEmployee)
        }
    }, [employees])

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Colaboradores</h1>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Cargo</TableHead>
                        <TableHead>Hard Skills</TableHead>
                        <TableHead>Soft Skills</TableHead>
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
                                <TableCell>
                                    <Skeleton className="h-4 w-[120px]" />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        employees.map((e) => (
                            <TableRow key={e.id}>
                                <TableCell>{e.name}</TableCell>
                                <TableCell>{e.job}</TableCell>
                                <TableCell>
                                    <ul>
                                        {skills[e.id]?.HARD.slice(0, 2).map(skill => (
                                            <li key={`${skill.id}-${skill.name}`}>
                                                {skill.name}
                                            </li>
                                        ))}
                                    </ul>
                                    {skills[e.id]?.HARD.length > 2 && (
                                        <SkillsModal type='HARD'
                                                employeeName={e.name}
                                                skills={skills[e.id]?.HARD}/>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <ul>
                                        {skills[e.id]?.SOFT.slice(0, 2).map(skill => (
                                            <li key={`${skill.id}-${skill.name}`}>
                                                {skill.name}
                                            </li>
                                        ))}
                                    </ul>
                                    {skills[e.id]?.SOFT.length > 2 && (
                                        <SkillsModal type='SOFT'
                                                     employeeName={e.name}
                                                     skills={skills[e.id]?.SOFT}/>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    )}

                </TableBody>
            </Table>
        </div>
    )
}

export default EmployeesPage
