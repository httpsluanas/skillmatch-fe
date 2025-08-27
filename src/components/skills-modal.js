import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

const SkillsModal = ({ name, skills, type }) => {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button size="sm" variant="link">
                        + Ver mais
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[650px]">
                    <DialogHeader>
                        <DialogTitle>{type == 'HARD' ? 'Hard' : 'Soft'} Skills</DialogTitle>
                        <DialogDescription>{name}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">varias skills e skills e skills</div>
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
