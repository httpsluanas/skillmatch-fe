// src/app/colaboradores/page.tsx
'use client'

import ImportModal from '@/components/import-modal'
import SkillsModal from '@/components/skills-modal'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const EmployeesPage = () => {
    const employees = [
        { id: 1, name: 'Ana Silva', job: 'Frontend Developer', skills: [] },
        { id: 2, name: 'João Santos', job: 'Data Analyst', skills: [] },
        { id: 3, name: 'Maria Oliveira', job: 'UX Designer', skills: [] }
    ]

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Colaboradores</h1>
                <ImportModal title={'Importar colaboradores'} templateUrl={'/'} />
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
                    {employees.map((e) => (
                        <TableRow key={e.id}>
                            <TableCell>{e.name}</TableCell>
                            <TableCell>{e.job}</TableCell>
                            <TableCell>-{/* <SkillsModal type='HARD' {...e}/> */}</TableCell>
                            <TableCell>-{/* <SkillsModal type='SOFT' {...e}/> */}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default EmployeesPage
