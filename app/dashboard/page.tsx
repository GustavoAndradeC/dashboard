"use client"

import Link from "next/link"
import { Users, FolderOpen, Clock, Timer } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Dados fictícios para o gráfico
const produtividadeData = [
  { nome: "Projeto A", horas: 30 },
  { nome: "Projeto B", horas: 45 },
  { nome: "Projeto C", horas: 20 },
  { nome: "Projeto D", horas: 35 },
  { nome: "Projeto E", horas: 25 },
]

// Dados fictícios para as tarefas
const tarefasPendentes = [
  {
    id: 1,
    tarefa: "Criar documentação",
    projeto: "Projeto A",
    responsavel: "João Silva",
    deadline: "03/06/2025",
    prioridade: "Alta",
  },
  {
    id: 2,
    tarefa: "Apresentar proposta",
    projeto: "Projeto B",
    responsavel: "Maria Santos",
    deadline: "05/06/2025",
    prioridade: "Média",
  },
  {
    id: 3,
    tarefa: "Revisar arquitetura",
    projeto: "Projeto C",
    responsavel: "Carlos Oliveira",
    deadline: "06/06/2025",
    prioridade: "Baixa",
  },
  {
    id: 4,
    tarefa: "Implementar funcionalidade",
    projeto: "Projeto D",
    responsavel: "Ana Costa",
    deadline: "08/06/2025",
    prioridade: "Alta",
  },
  {
    id: 5,
    tarefa: "Testes de qualidade",
    projeto: "Projeto E",
    responsavel: "Pedro Lima",
    deadline: "10/06/2025",
    prioridade: "Média",
  },
]

const chartConfig = {
  horas: {
    label: "Horas",
    color: "hsl(var(--chart-1))",
  },
}

function getPrioridadeBadge(prioridade: string) {
  switch (prioridade) {
    case "Alta":
      return <Badge variant="destructive">{prioridade}</Badge>
    case "Média":
      return <Badge variant="default">{prioridade}</Badge>
    case "Baixa":
      return <Badge variant="secondary">{prioridade}</Badge>
    default:
      return <Badge variant="outline">{prioridade}</Badge>
  }
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Painel de Controle</h1>
          <p className="text-muted-foreground">Visão geral dos consultores, projetos e tarefas da sua empresa</p>
        </div>

        {/* Cards com Estatísticas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/consultores">
            <Card className="cursor-pointer transition-colors hover:bg-muted/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Consultores</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 novos este mês</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/projetos">
            <Card className="cursor-pointer transition-colors hover:bg-muted/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Projetos Ativos</CardTitle>
                <FolderOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">3 em desenvolvimento</p>
              </CardContent>
            </Card>
          </Link>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tarefas Pendentes</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">5 com alta prioridade</p>
            </CardContent>
          </Card>

          <Link href="/relatorios">
            <Card className="cursor-pointer transition-colors hover:bg-muted/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Média de Horas/dia</CardTitle>
                <Timer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6.5h</div>
                <p className="text-xs text-muted-foreground">+0.5h vs. mês anterior</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Gráfico de Produtividade */}
        <Card>
          <CardHeader>
            <CardTitle>Produtividade por Projeto</CardTitle>
            <CardDescription>Horas trabalhadas nos últimos projetos</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px]">
              <BarChart
                accessibilityLayer
                data={produtividadeData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis dataKey="nome" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="horas" fill="var(--color-horas)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Tabela de Tarefas */}
        <Card>
          <CardHeader>
            <CardTitle>Tarefas Pendentes</CardTitle>
            <CardDescription>Lista das tarefas mais urgentes e recentes</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tarefa</TableHead>
                  <TableHead>Projeto</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Prioridade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tarefasPendentes.map((tarefa) => (
                  <TableRow key={tarefa.id}>
                    <TableCell className="font-medium">{tarefa.tarefa}</TableCell>
                    <TableCell>{tarefa.projeto}</TableCell>
                    <TableCell>{tarefa.responsavel}</TableCell>
                    <TableCell>{tarefa.deadline}</TableCell>
                    <TableCell>{getPrioridadeBadge(tarefa.prioridade)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
