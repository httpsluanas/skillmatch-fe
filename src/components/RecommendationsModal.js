import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { Skeleton } from '@/components/ui/skeleton'

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'

import SkillsModal from '@/components/SkillsModal'

const RecommendationsModal = ({ projectTitle, recommendations, handleOpenBtnClick, isLoading, requiredSkills, modalTitle }) => {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button size="sm" variant="outline" onClick={handleOpenBtnClick}>
                        {modalTitle}
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Recomendações</DialogTitle>
                        <DialogDescription>{projectTitle}</DialogDescription>
                    </DialogHeader>
                    {isLoading ? (
                        <Skeleton/>
                    ) : (
                        <div className="grid gap-4">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nome</TableHead>
                                        <TableHead>Score</TableHead>
                                        <TableHead>Skills compatíveis</TableHead>
                                        <TableHead>Justificativa</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recommendations?.map((recommendation, i) => (
                                        <TableRow key={`${recommendation.employee.id}-${i}`}>
                                            <TableCell>{recommendation.employee.name}</TableCell>
                                            <TableCell>{recommendation.score}</TableCell>
                                            <TableCell>
                                                {recommendation.justification}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default RecommendationsModal
