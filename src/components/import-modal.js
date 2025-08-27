import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

const ImportModal = ({ title, templateUrl }) => {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">{title}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[650px]">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <ol>
                            <li>
                                1. <a href={templateUrl}>Baixe o template</a> e preencha com as informações que você deseja importar
                            </li>
                            <li>2. Faça o upload do arquivo preenchido:</li>
                        </ol>
                        <div className="grid gap-3">
                            <Input id="name-1" name="file" type="file" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">Importar</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default ImportModal
