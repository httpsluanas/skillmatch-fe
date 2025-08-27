'use client'

import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import ImportModal from '@/components/import-modal'
import { Badge } from '@/components/ui/badge'

const SkillsPage = () => {
    // Simulação de dados
    const skills = [
        { id: 1, name: 'Programação', type: 'Hard' },
        { id: 2, name: 'Comunicação', type: 'Soft' },
        { id: 3, name: 'Design UI/UX', type: 'Hard' },
        { id: 4, name: 'Trabalho em equipe', type: 'Soft' }
    ]

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Skills</h1>
                <ImportModal title={'Importar skills'} templateUrl={'/'} />
            </div>

            {/* Tabela */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {skills.map((skill) => (
                        <TableRow key={skill.id}>
                            <TableCell>{skill.name}</TableCell>
                            <TableCell>
                                <Badge>{skill.type}</Badge>
                            </TableCell>
                            <TableCell>
                                <Button variant="destructive" size="sm">
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default SkillsPage
