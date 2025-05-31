"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Clock, TrendingUp, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"
import { Line, LineChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Dados fictícios para relatórios de horas
const horasPorDia = [
  { dia: "Seg", horas: 8.5 },
  { dia: "Ter", horas: 7.2 },
  { dia: "Qua", horas: 8.0 },
  { dia: "Qui", horas: 6.8 },
  { dia: "Sex", horas: 7.5 },
  { dia: "Sáb", horas: 2.0 },
  { dia: "Dom", horas: 0 },
]

const horasPorConsultor = [
  { consultor: "João Silva", horasSemanais: 42, horasMes: 168, eficiencia: 95 },
  { consultor: "Maria Santos", horasSemanais: 38, horasMes: 152, eficiencia: 88 },
  { consultor: "Carlos Oliveira", horasSemanais: 35, horasMes: 140, eficiencia: 82 },
  { consultor: "Ana Costa", horasSemanais: 40, horasMes: 160, eficiencia: 92 },
  { consultor: "Pedro Lima", horasSemanais: 36, horasMes: 144, eficiencia: 85 },
]

const horasPorProjeto = [
  { projeto: "E-commerce", horasGastas: 520, horasEstimadas: 800, progresso: 65 },
  { projeto: "App Mobile", horasGastas: 90, horasEstimadas: 600, progresso: 15 },
  { projeto: "Dashboard", horasGastas: 285, horasEstimadas: 300, progresso: 95 },
  { projeto: "CRM", horasGastas: 400, horasEstimadas: 1000, progresso: 40 },
  { projeto: "Website", horasGastas: 128, horasEstimadas: 150, progresso: 85 },
]

const chartConfig = {
  horas: {
    label: "Horas",
    color: "hsl(var(--chart-1))",
  },
}

function getEficienciaBadge(eficiencia: number) {
  if (eficiencia >= 90) return <Badge className="bg-green-500 hover:bg-green-600">Excelente</Badge>
  if (eficiencia >= 80) return <Badge variant="default">Boa</Badge>
  if (eficiencia >= 70) return <Badge variant="secondary">Regular</Badge>
  return <Badge variant="destructive">Baixa</Badge>
}

export default function RelatoriosPage() {
  const [periodoSelecionado, setPeriodoSelecionado] = useState("semana")

  const totalHorasSemanais = horasPorConsultor.reduce((acc, c) => acc + c.horasSemanais, 0)
  const mediaHorasDiarias = totalHorasSemanais / 7
  const eficienciaMedia = horasPorConsultor.reduce((acc, c) => acc + c.eficiencia, 0) / horasPorConsultor.length

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Relatórios de Horas</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Relatórios de Horas</h1>
            <p className="text-muted-foreground">Acompanhe a produtividade e distribuição de horas da equipe</p>
          </div>

          <div className="flex items-center space-x-2">
            <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semana">Esta Semana</SelectItem>
                <SelectItem value="mes">Este Mês</SelectItem>
                <SelectItem value="trimestre">Trimestre</SelectItem>
                <SelectItem value="ano">Este Ano</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Estatísticas Principais */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Horas (Semana)</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHorasSemanais}h</div>
              <p className="text-xs text-muted-foreground">+5h vs. semana anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Média Diária</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mediaHorasDiarias.toFixed(1)}h</div>
              <p className="text-xs text-muted-foreground">Por consultor ativo</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eficiência Média</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{eficienciaMedia.toFixed(0)}%</div>
              <p className="text-xs text-muted-foreground">+3% vs. mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Horas Faturáveis</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156h</div>
              <p className="text-xs text-muted-foreground">83% do total</p>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Horas por Dia da Semana</CardTitle>
              <CardDescription>Distribuição de horas trabalhadas</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="min-h-[200px]">
                <LineChart data={horasPorDia}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dia" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="horas"
                    stroke="var(--color-horas)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-horas)" }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Horas por Consultor</CardTitle>
              <CardDescription>Comparativo semanal da equipe</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="min-h-[200px]">
                <BarChart data={horasPorConsultor}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="consultor" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="horasSemanais" fill="var(--color-horas)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Tabelas Detalhadas */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho por Consultor</CardTitle>
              <CardDescription>Horas trabalhadas e eficiência</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Consultor</TableHead>
                    <TableHead>Horas/Semana</TableHead>
                    <TableHead>Eficiência</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {horasPorConsultor.map((consultor, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{consultor.consultor}</TableCell>
                      <TableCell>{consultor.horasSemanais}h</TableCell>
                      <TableCell>{getEficienciaBadge(consultor.eficiencia)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Horas por Projeto</CardTitle>
              <CardDescription>Progresso e tempo gasto</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Projeto</TableHead>
                    <TableHead>Gastas/Estimadas</TableHead>
                    <TableHead>Progresso</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {horasPorProjeto.map((projeto, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{projeto.projeto}</TableCell>
                      <TableCell>
                        {projeto.horasGastas}h / {projeto.horasEstimadas}h
                      </TableCell>
                      <TableCell>
                        <Badge variant={projeto.progresso > 80 ? "default" : "secondary"}>{projeto.progresso}%</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
