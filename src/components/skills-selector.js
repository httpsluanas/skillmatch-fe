import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { X, ChevronsUpDown } from 'lucide-react'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@/components/ui/popover'
import {
    Command,
    CommandInput,
    CommandList,
    CommandGroup,
    CommandItem,
    CommandEmpty,
} from '@/components/ui/command'

import { fetchSkills } from '@/services/skillService'

const SkillsSelector = ({ value = [], onChange }) => {
    const [skills, setSkills] = useState([])
    const [isFetching, setIsFetching] = useState(true)
    const [open, setOpen] = useState(false)
    const [selectedSkills, setSelectedSkills] = useState(value)

    useEffect(() => {
        fetchSkills()
            .then(data => setSkills(data))
            .finally(() => setIsFetching(false))
    }, [])

    useEffect(() => {
        onChange?.(selectedSkills)
    }, [selectedSkills, onChange])

    const toggleSkill = (skill) => {
        if (selectedSkills.some(s => s.id === skill.id)) {
            setSelectedSkills(prev => prev.filter(s => s.id !== skill.id))
        } else {
            setSelectedSkills(prev => [...prev, { ...skill, relevance: 3 }])
        }
    }

    const changeRelevance = (id, value) => {
        setSelectedSkills(prev =>
            prev.map(s => s.id === id ? { ...s, relevance: value[0] } : s)
        )
    }

    return (
        <div className='space-y-4'>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant='outline'
                        role='combobox'
                        aria-expanded={open}
                        className='w-[250px] justify-between'
                    >
                        {selectedSkills.length > 0
                            ? `${selectedSkills.length} skills selecionadas`
                            : 'Selecione skills'}
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className='w-[250px] p-0'>
                    <Command>
                        <CommandInput placeholder='Pesquisar skills...' />
                        <CommandList>
                            {isFetching && <span>Carregando...</span>}
                            <CommandEmpty>Nenhuma skill encontrada.</CommandEmpty>
                            <CommandGroup>
                                {skills
                                    .filter(skill => !selectedSkills.some(s => s.id === skill.id))
                                    .map(skill => (
                                        <CommandItem
                                            key={skill.id}
                                            value={skill.id}
                                            onSelect={() => toggleSkill(skill)}
                                        >
                                            {skill.name}
                                        </CommandItem>
                                    ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            <div className='space-y-3'>
                {selectedSkills.map(skill => (
                    <div
                        key={skill.id}
                        className='flex items-center justify-between rounded-lg border p-3'
                    >
                        <div className='flex-1'>
                            <p className='font-medium'>{skill.name}</p>
                            <Slider
                                value={[skill.relevance]}
                                min={0}
                                max={5}
                                step={1}
                                className='w-[200px] mt-2'
                                onValueChange={(val) => changeRelevance(skill.id, val)}
                                aria-label={`Relevância de ${skill.name}`}
                            />
                            <span className='text-sm text-muted-foreground'>
                                Relevância: {skill.relevance}
                            </span>
                        </div>

                        <Button
                            variant='ghost'
                            size='icon'
                            onClick={() =>
                                setSelectedSkills(prev =>
                                    prev.filter(s => s.id !== skill.id)
                                )
                            }
                            aria-label={`Remover ${skill.name}`}
                        >
                            <X className='h-4 w-4' />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SkillsSelector