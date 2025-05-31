"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Edit, Trash2, Mail, Phone } from "lucide-react"
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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// Dados fictícios dos consultores
const consultoresData = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao.silva@empresa.com",
    telefone: "(11) 99999-1111",
    especialidade: "Frontend",
    status: "Ativo",
    projetos: 3,
    horasSemanais: 40,
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria.santos@empresa.com",
    telefone: "(11) 99999-2222",
    especialidade: "Backend",
    status: "Ativo",
    projetos: 2,
    horasSemanais: 35,
  },
  {
    id: 3,
    nome: "Carlos Oliveira",
    email: "carlos.oliveira@empresa.com",
    telefone: "(11) 99999-3333",
    especialidade: "DevOps",
    status: "Férias",
    projetos: 1,
    horasSemanais: 0,
  },
  {
    id: 4,
    nome: "Ana Costa",
    email: "ana.costa@empresa.com",
    telefone: "(11) 99999-4444",
    especialidade: "UI/UX",
    status: "Ativo",
    projetos: 4,
    horasSemanais: 42,
  },
  {
    id: 5,
    nome: "Pedro Lima",
    email: "pedro.lima@empresa.com",
    telefone: "(11) 99999-5555",
    especialidade: "QA",
    status: "Ativo",
    projetos: 2,
    horasSemanais: 38,
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "Ativo":
      return <Badge variant="default">{status}</Badge>
    case "Férias":
      return <Badge variant="secondary">{status}</Badge>
    case "Inativo":
      return <Badge variant="destructive">{status}</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function ConsultoresPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredConsultores = consultoresData.filter(
    (consultor) =>
      consultor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultor.especialidade.toLowerCase().includes(searchTerm.toLowerCase()),
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
              <BreadcrumbPage>Consultores</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Consultores</h1>
            <p className="text-muted-foreground">Gerencie sua equipe de consultores e suas especialidades</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Consultor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Consultor</DialogTitle>
                <DialogDescription>Preencha as informações do novo consultor abaixo.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nome" className="text-right">
                    Nome
                  </Label>
                  <Input id="nome" placeholder="Nome completo" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" type="email" placeholder="email@empresa.com" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="telefone" className="text-right">
                    Telefone
                  </Label>
                  <Input id="telefone" placeholder="(11) 99999-9999" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="especialidade" className="text-right">
                    Especialidade
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione a especialidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frontend">Frontend</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                      <SelectItem value="fullstack">Fullstack</SelectItem>
                      <SelectItem value="devops">DevOps</SelectItem>
                      <SelectItem value="uiux">UI/UX</SelectItem>
                      <SelectItem value="qa">QA</SelectItem>
                      <SelectItem value="mobile">Mobile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => setIsDialogOpen(false)}>
                  Adicionar Consultor
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total de Consultores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{consultoresData.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Consultores Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{consultoresData.filter((c) => c.status === "Ativo").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Horas Semanais Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{consultoresData.reduce((acc, c) => acc + c.horasSemanais, 0)}h</div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros e Busca */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Consultores</CardTitle>
            <CardDescription>Visualize e gerencie todos os consultores da empresa</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou especialidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Especialidade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Projetos</TableHead>
                  <TableHead>Horas/Semana</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConsultores.map((consultor) => (
                  <TableRow key={consultor.id}>
                    <TableCell className="font-medium">{consultor.nome}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="mr-1 h-3 w-3" />
                          {consultor.email}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="mr-1 h-3 w-3" />
                          {consultor.telefone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{consultor.especialidade}</TableCell>
                    <TableCell>{getStatusBadge(consultor.status)}</TableCell>
                    <TableCell>{consultor.projetos}</TableCell>
                    <TableCell>{consultor.horasSemanais}h</TableCell>
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
