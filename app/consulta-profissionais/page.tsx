"use client"

import { useState, useEffect } from "react"
import { SimpleHeader } from "@/components/layout/simple-header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, UserPlus, Edit, Trash2, Users } from "lucide-react"
import Link from "next/link"

interface Profissional {
  id: string
  nome: string
  especialidade: string
  unidade: string
  registro: string
  telefone: string
  email: string
  status: "ativo" | "inativo"
}

export default function ConsultaProfissionais() {
  const [profissionais, setProfissionais] = useState<Profissional[]>([])
  const [loading, setLoading] = useState(true)
  const [filtros, setFiltros] = useState({
    nome: "",
    especialidade: "",
    unidade: "",
    status: "",
  })

  useEffect(() => {
    carregarProfissionais()
  }, [])

  const carregarProfissionais = () => {
    setTimeout(() => {
      const mockProfissionais: Profissional[] = [
        {
          id: "1",
          nome: "Dr. João Silva",
          especialidade: "Cardiologia",
          unidade: "UBS Central",
          registro: "CRM 12345",
          telefone: "(11) 99999-9999",
          email: "joao.silva@sus.gov.br",
          status: "ativo",
        },
        {
          id: "2",
          nome: "Dra. Maria Santos",
          especialidade: "Pediatria",
          unidade: "UBS Vila Mariana",
          registro: "CRM 67890",
          telefone: "(11) 88888-8888",
          email: "maria.santos@sus.gov.br",
          status: "ativo",
        },
        {
          id: "3",
          nome: "Dr. Carlos Oliveira",
          especialidade: "Ortopedia",
          unidade: "UBS Centro",
          registro: "CRM 54321",
          telefone: "(11) 77777-7777",
          email: "carlos.oliveira@sus.gov.br",
          status: "inativo",
        },
      ]
      setProfissionais(mockProfissionais)
      setLoading(false)
    }, 1000)
  }

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }))
  }

  const profissionaisFiltrados = profissionais.filter((profissional) => {
    return (
      profissional.nome.toLowerCase().includes(filtros.nome.toLowerCase()) &&
      (filtros.especialidade === "" || profissional.especialidade === filtros.especialidade) &&
      (filtros.unidade === "" || profissional.unidade === filtros.unidade) &&
      (filtros.status === "" || profissional.status === filtros.status)
    )
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-900">
      <SimpleHeader title="Consulta de Profissionais" showBackButton backUrl="/cadastro-profissionais" />

      <main className="container mx-auto px-4 py-8">
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="h-6 w-6 text-emerald-600" />
                Consulta de Profissionais de Saúde
              </CardTitle>
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Link href="/cadastro-profissionais">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Novo Profissional
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filtros */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="filtro-nome" className="text-slate-700 dark:text-slate-300">
                  Nome
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="filtro-nome"
                    placeholder="Buscar por nome"
                    value={filtros.nome}
                    onChange={(e) => handleFiltroChange("nome", e.target.value)}
                    className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300">Especialidade</Label>
                <Select
                  value={filtros.especialidade}
                  onValueChange={(value) => handleFiltroChange("especialidade", value)}
                >
                  <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="Cardiologia">Cardiologia</SelectItem>
                    <SelectItem value="Pediatria">Pediatria</SelectItem>
                    <SelectItem value="Ortopedia">Ortopedia</SelectItem>
                    <SelectItem value="Dermatologia">Dermatologia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300">Unidade</Label>
                <Select value={filtros.unidade} onValueChange={(value) => handleFiltroChange("unidade", value)}>
                  <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="UBS Central">UBS Central</SelectItem>
                    <SelectItem value="UBS Vila Mariana">UBS Vila Mariana</SelectItem>
                    <SelectItem value="UBS Centro">UBS Centro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300">Status</Label>
                <Select value={filtros.status} onValueChange={(value) => handleFiltroChange("status", value)}>
                  <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Tabela */}
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 dark:bg-slate-800">
                    <TableHead className="text-slate-700 dark:text-slate-300">Nome</TableHead>
                    <TableHead className="text-slate-700 dark:text-slate-300">Especialidade</TableHead>
                    <TableHead className="text-slate-700 dark:text-slate-300">Unidade</TableHead>
                    <TableHead className="text-slate-700 dark:text-slate-300">Registro</TableHead>
                    <TableHead className="text-slate-700 dark:text-slate-300">Contato</TableHead>
                    <TableHead className="text-slate-700 dark:text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-700 dark:text-slate-300">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                          <span className="ml-2 text-slate-600 dark:text-slate-400">Carregando...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : profissionaisFiltrados.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-slate-600 dark:text-slate-400">
                        Nenhum profissional encontrado
                      </TableCell>
                    </TableRow>
                  ) : (
                    profissionaisFiltrados.map((profissional) => (
                      <TableRow key={profissional.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <TableCell className="font-medium text-slate-900 dark:text-white">
                          {profissional.nome}
                        </TableCell>
                        <TableCell className="text-slate-600 dark:text-slate-400">
                          {profissional.especialidade}
                        </TableCell>
                        <TableCell className="text-slate-600 dark:text-slate-400">{profissional.unidade}</TableCell>
                        <TableCell className="text-slate-600 dark:text-slate-400">{profissional.registro}</TableCell>
                        <TableCell className="text-slate-600 dark:text-slate-400">
                          <div className="space-y-1">
                            <div>{profissional.telefone}</div>
                            <div className="text-xs">{profissional.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={profissional.status === "ativo" ? "default" : "secondary"}
                            className={
                              profissional.status === "ativo"
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                                : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
                            }
                          >
                            {profissional.status === "ativo" ? "Ativo" : "Inativo"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Resumo */}
            <div className="mt-6 flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
              <div>
                Mostrando {profissionaisFiltrados.length} de {profissionais.length} profissionais
              </div>
              <div className="flex items-center space-x-4">
                <Badge
                  variant="outline"
                  className="border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400"
                >
                  {profissionais.filter((p) => p.status === "ativo").length} Ativos
                </Badge>
                <Badge
                  variant="outline"
                  className="border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-400"
                >
                  {profissionais.filter((p) => p.status === "inativo").length} Inativos
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
