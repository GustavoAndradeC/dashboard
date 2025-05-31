"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Edit, Trash2, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Progress } from "@/components/ui/progress"

// Dados fictícios dos projetos
const projetosData = [
  {
    id: 1,
    nome: "Sistema de E-commerce",
    cliente: "Loja Virtual ABC",
    status: "Em Desenvolvimento",
    progresso: 65,
    dataInicio: "01/03/2025",
    dataFim: "30/06/2025",
    consultores: ["João Silva", "Maria Santos"],
    orcamento: "R$ 150.000",
    horasEstimadas: 800,
    horasGastas: 520,
  },
  {
    id: 2,
    nome: "App Mobile Delivery",
    cliente: "Restaurante XYZ",
    status: "Planejamento",
    progresso: 15,
    dataInicio: "15/04/2025",
    dataFim: "15/08/2025",
    consultores: ["Ana Costa", "Pedro Lima"],
    orcamento: "R$ 80.000",
    horasEstimadas: 600,
    horasGastas: 90,
  },
  {
    id: 3,
    nome: "Dashboard Analytics",
    cliente: "Empresa Tech",
    status: "Concluído",
    progresso: 100,
    dataInicio: "01/01/2025",
    dataFim: "28/02/2025",
    consultores: ["Carlos Oliveira"],
    orcamento: "R$ 45.000",
    horasEstimadas: 300,
    horasGastas: 285,
  },
  {
    id: 4,
    nome: "Sistema CRM",
    cliente: "Vendas Pro",
    status: "Em Desenvolvimento",
    progresso: 40,
    dataInicio: "10/02/2025",
    dataFim: "10/07/2025",
    consultores: ["João Silva", "Ana Costa", "Pedro Lima"],
    orcamento: "R$ 200.000",
    horasEstimadas: 1000,
    horasGastas: 400,
  },
  {
    id: 5,
    nome: "Website Institucional",
    cliente: "Consultoria ABC",
    status: "Revisão",
    progresso: 85,
    dataInicio: "01/04/2025",
    dataFim: "30/04/2025",
    consultores: ["Maria Santos"],
    orcamento: "R$ 25.000",
    horasEstimadas: 150,
    horasGastas: 128,
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "Em Desenvolvimento":
      return <Badge variant="default">{status}</Badge>
    case "Planejamento":
      return <Badge variant="secondary">{status}</Badge>
    case "Concluído":
      return <Badge className="bg-green-500 hover:bg-green-600">{status}</Badge>
    case "Revisão":
      return <Badge variant="outline">{status}</Badge>
    case "Pausado":
      return <Badge variant="destructive">{status}</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function ProjetosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredProjetos = projetosData.filter(
    (projeto) =>
      projeto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      projeto.cliente.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
              <BreadcrumbPage>Projetos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Projetos</h1>
            <p className="text-muted-foreground">Acompanhe o progresso e gerencie todos os projetos da empresa</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Projeto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Criar Novo Projeto</DialogTitle>
                <DialogDescription>Preencha as informações do novo projeto abaixo.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nome" className="text-right">
                    Nome
                  </Label>
                  <Input id="nome" placeholder="Nome do projeto" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cliente" className="text-right">
                    Cliente
                  </Label>
                  <Input id="cliente" placeholder="Nome do cliente" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="orcamento" className="text-right">
                    Orçamento
                  </Label>
                  <Input id="orcamento" placeholder="R$ 0,00" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dataInicio" className="text-right">
                    Data Início
                  </Label>
                  <Input id="dataInicio" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dataFim" className="text-right">
                    Data Fim
                  </Label>
                  <Input id="dataFim" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planejamento">Planejamento</SelectItem>
                      <SelectItem value="desenvolvimento">Em Desenvolvimento</SelectItem>
                      <SelectItem value="revisao">Revisão</SelectItem>
                      <SelectItem value="concluido">Concluído</SelectItem>
                      <SelectItem value="pausado">Pausado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="descricao" className="text-right">
                    Descrição
                  </Label>
                  <Textarea id="descricao" placeholder="Descrição do projeto" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => setIsDialogOpen(false)}>
                  Criar Projeto
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total de Projetos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projetosData.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Em Desenvolvimento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {projetosData.filter((p) => p.status === "Em Desenvolvimento").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projetosData.filter((p) => p.status === "Concluído").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Orçamento Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 500k</div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Projetos */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Projetos</CardTitle>
            <CardDescription>Visualize e gerencie todos os projetos da empresa</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome do projeto ou cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Projeto</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progresso</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead>Equipe</TableHead>
                  <TableHead>Orçamento</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjetos.map((projeto) => (
                  <TableRow key={projeto.id}>
                    <TableCell className="font-medium">{projeto.nome}</TableCell>
                    <TableCell>{projeto.cliente}</TableCell>
                    <TableCell>{getStatusBadge(projeto.status)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Progress value={projeto.progresso} className="w-16" />
                        <span className="text-xs text-muted-foreground">{projeto.progresso}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-1 h-3 w-3" />
                          {projeto.dataInicio}
                        </div>
                        <div className="text-sm text-muted-foreground">até {projeto.dataFim}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Users className="mr-1 h-3 w-3" />
                        {projeto.consultores.length} consultor{projeto.consultores.length > 1 ? "es" : ""}
                      </div>
                    </TableCell>
                    <TableCell>{projeto.orcamento}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
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
