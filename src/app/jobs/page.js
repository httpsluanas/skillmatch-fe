import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import AddJobModal from '@/components/add-job-modal'

const labels = {
    OPENED: 'Em aberto',
    FILLED: 'Preenchida',
    CLOSED: 'Fechada'
}

const JobsPage = ({}) => {
    const vagas = [
        { vaga: 'Senior Software Engineer', departamento: 'Desenvolvimento', status: 'OPENED', skills: [] },
        { vaga: 'Product Manager', departamento: 'Produto', status: 'FILLED', skills: [] },
        { vaga: 'UX Designer', departamento: 'Design', status: 'CLOSED', skills: [] }
    ]

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
                        <TableHead>Departamento</TableHead>
                        <TableHead>Skills requeridas</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {vagas.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.vaga}</TableCell>
                            <TableCell>{item.departamento}</TableCell>
                            <TableCell>-{/* <Badge variant={item.status == 'OPENED' ? 'outline' : item.status == 'CLOSED' ? 'secondary' : 'default'}>{labels[item.status]}</Badge> */}</TableCell>
                            <TableCell>
                                <Button size="sm" variant="outline">
                                    Visualizar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default JobsPage
