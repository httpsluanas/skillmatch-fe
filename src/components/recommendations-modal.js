import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { Skeleton } from '@/components/ui/skeleton'

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'

import SkillsModal from '@/components/skills-modal'

const RecommendationsModal = ({ jobTitle, recommendations, handleOpenBtnClick, isLoading, requiredSkills, modalTitle }) => {
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
                        <DialogDescription>{jobTitle}</DialogDescription>
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
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recommendations?.map((recommendation, i) => (
                                        <TableRow key={`${recommendation.employee.id}-${i}`}>
                                            <TableCell>{recommendation.employee.name}</TableCell>
                                            <TableCell>{recommendation.score}</TableCell>
                                            <TableCell>
                                                <ul>
                                                    {recommendation.employee.skills.filter(skill => requiredSkills.some(requiredSkill => requiredSkill.id === skill.id)).map(skill => (
                                                        <li key={`${skill.id}-${skill.name}`}>
                                                            {skill.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                                <SkillsModal skills={recommendation.employee.skills} employeeName={recommendation.employee.name} type={recommendation.employee.type}/>
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
