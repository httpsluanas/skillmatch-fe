'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis, Tooltip } from 'recharts'

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { fetchProjectRecommendation } from '@/services/projectsService'

const chartConfig = {
  value: {
    label: 'Score',
    color: '#60A5FA', // azul clarinho
  },
  label: {
    color: '#FFFFFF', // texto branco dentro da barra
  },
}

const RecommendationsPage = () => {
  const searchParams = useSearchParams()
  const recommendationType = searchParams.get('recommendationType')
  const projectId = searchParams.get('projectId')

  const [projectRecomendation, setProjectRecomendation] = useState([])
  const [isFetchingRecommendations, setIsFetchingRecommendations] = useState(true)
  const [errorRecommendations, setErrorRecommendations] = useState(null)

  useEffect(() => {
    if (projectId && recommendationType) {
      fetchProjectRecommendation(projectId, recommendationType)
        .then(setProjectRecomendation)
        .catch((err) => setErrorRecommendations(err.message))
        .finally(() => setIsFetchingRecommendations(false))
    }
  }, [projectId, recommendationType])

  const recommendations = projectRecomendation.recommendations ?? []

  const data = recommendations.slice(0, 10).map((r) => ({
        name: r.employee.name,
        value: r.score,
        justification: r.justification,
  }))

  return (
    <div className="p-6 space-y-6">
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>Colaboradores recomendados para o projeto "{projectRecomendation.projectName}"</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              layout="vertical"
              data={data}
              margin={{ right: 16 }}
              barCategoryGap="10%"
            >
              <CartesianGrid horizontal={false} />
              <YAxis type="category" dataKey="name" hide />
              <XAxis type="number" hide />
              
              {/* Tooltip customizado para mostrar justification */}
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.1)' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-gray-900 text-white p-2 rounded shadow-lg">
                        <strong>{payload[0].payload.name}</strong>
                        <div>{payload[0].payload.justification}</div>
                        <div className="mt-1 font-bold">Score: {payload[0].value}</div>
                      </div>
                    )
                  }
                  return null
                }}
              />

              <Bar
                dataKey="value"
                fill="#60A5FA" // azul clarinho
                radius={4}
                isAnimationActive
                animationDuration={800}
              >
                <LabelList
                  dataKey="name"
                  position="insideLeft"
                  className="fill-white font-medium"
                  fontSize={12}
                />
                <LabelList
                  dataKey="value"
                  position="right"
                  className="fill-white font-medium"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Top 5 scores deste projeto <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Mostrando os 5 colaboradores com maior pontuação
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default RecommendationsPage
