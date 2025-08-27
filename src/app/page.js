'use client'

import Link from 'next/link'
import { Home, Users, Star, Briefcase } from 'lucide-react'

const HomePage = () => {
    const cards = [
        { title: 'Colaboradores', description: 'Consulte perfis e habilidades dos colaboradores.', icon: Users, href: '/employees' },
        { title: 'Skills', description: 'Gerencie as habilidades disponíveis em sua empresa.', icon: Star, href: '/skills' },
        { title: 'Vagas', description: 'Crie, visualize e gerencie vagas com facilidade.', icon: Briefcase, href: '/jobs' }
    ]

    return (
        <div className="max-w-6xl mx-auto p-8">
            <h1 className="text-4xl font-bold text-indigo-600 mb-4">Bem-vindo ao SkillMatch!</h1>
            <p className="text-gray-700 mb-6">
                O SkillMatch é um sistema inteligente de gestão de vagas e candidatos, pensado para otimizar o processo de seleção dentro da sua empresa. Ele não apenas organiza vagas e perfis de
                colaboradores, mas também <strong>analisa as habilidades cadastradas</strong> e <strong>recomenda automaticamente os funcionários mais indicados</strong> para cada posição.
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                <li>
                    <strong>Gestão de Vagas:</strong> crie e gerencie vagas detalhando requisitos e habilidades necessárias;
                </li>
                <li>
                    <strong>Perfis de Colaboradores:</strong> cadastre e organize as habilidades de cada funcionário, acompanhando sua experiência e competências;
                </li>
                <li>
                    <strong>Recomendações Automáticas:</strong> receba sugestões de candidatos ideais para cada vaga, com base na compatibilidade entre habilidades do colaborador e exigências da vaga;
                </li>
                <li>
                    <strong>Relatórios e Insights:</strong> acompanhe indicadores de talentos e vagas, ajudando na tomada de decisão estratégica e no planejamento interno.
                </li>
            </ul>
            <p className="text-gray-600 mb-8">
                O SkillMatch ajuda empresas a <strong>identificar rapidamente os melhores talentos</strong>, economizando tempo, evitando escolhas manuais e tornando o processo de seleção mais justo e
                eficiente.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card) => {
                    const Icon = card.icon
                    return (
                        <Link key={card.title} href={card.href} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start gap-4 hover:shadow-xl transition-shadow duration-200">
                            <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full">
                                <Icon className="h-6 w-6" />
                            </div>
                            <h2 className="text-xl font-semibold">{card.title}</h2>
                            <p className="text-gray-600 text-sm">{card.description}</p>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default HomePage
