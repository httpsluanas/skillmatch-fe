'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import SkillsSelector from '@/components/SkillsSelector'

const FormSchema = z.object({
    title: z.string().min(1, 'Título é obrigatório'),
    description: z.string().min(1, 'Descrição é obrigatória'),
    skills: z.array(
        z.object({
            id: z.number(),
            relevance: z.number()
        })
    ).optional()
})

const AddProjectModal = ({submit, onSuccess}) => {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: '',
            description: '',
            skills: []
        }
    })

    const [open, setOpen] = useState(false)

    const onSubmit = async (values) => {
        try {
        const newProject = await submit(values)
            onSuccess?.(newProject)
            setOpen(false)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Cadastrar novo projeto</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[650px]">
                <DialogHeader>
                    <DialogTitle>Cadastrar novo projeto</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form id="add-project-form" onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                        <div role="tabpanel" className='block space-y-4'>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="title">Título</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="title"
                                                type="text"
                                                placeholder="Digite o título do projeto..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="description">Descrição</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                id="description"
                                                rows={6}
                                                placeholder="Descreva as principais responsabilidades, atividades e requisitos do projeto..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div role="tabpanel" >
                            <FormField
                                name="skills"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="skills">Skills</FormLabel>
                                        <FormControl>
                                            <SkillsSelector
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>

                <DialogFooter className="flex justify-between">
                    <div className="flex gap-4">
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" form="add-project-form">
                            Finalizar
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddProjectModal