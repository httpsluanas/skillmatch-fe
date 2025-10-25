import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

const SkillsModal = ({ employeeName, skills, type }) => {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button size="sm" variant="link">
                        + Ver todas
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[650px]">
                    <DialogHeader>
                        <DialogTitle>{type == 'HARD' ? 'Hard' : type == 'SOFT' ? 'soft' : ''} Skills</DialogTitle>
                        <DialogDescription>{employeeName}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <ul>
                            {skills.map(skill => (
                                <li key={skill.id}>{skill.name}</li>
                            ))}
                        </ul>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Fechar</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default SkillsModal
