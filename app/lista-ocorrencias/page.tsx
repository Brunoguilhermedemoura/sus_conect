"use client"

import { useState, useEffect } from "react"
import { SimpleHeader } from "@/components/layout/simple-header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { FileText, Search, Download, Eye, Filter, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Ocorrencia {
  id: string
  data: string
  tipo: string
  descricao: string
  status: "concluido" | "em_andamento" | "agendado"
  unidade: string
}

export default function ListaOcorrencias() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [filtro, setFiltro] = useState<string>("")
  const [tipoFiltro, setTipoFiltro] = useState<string>("todos")
  const [statusFiltro, setStatusFiltro] = useState<string>("todos")

  useEffect(() => {
    // Simulando carregamento de dados
    setTimeout(() => {
      const mockOcorrencias: Ocorrencia[] = [
        {
          id: "1",
          data: "12/04/2024",
          tipo: "Consulta",
          descricao: "Infecção Urinária",
          status: "concluido",
          unidade: "UBS Central",
        },
        {
          id: "2",
          data: "24/04/2024",
          tipo: "Consulta",
          descricao: "Amidalite",
          status: "concluido",
          unidade: "UBS Norte",
        },
        {
          id: "3",
          data: "25/07/2024",
          tipo: "Exame",
          descricao: "Cálculos Renais",
          status: "em_andamento",
          unidade: "Hospital Regional",
        },
        {
          id: "4",
          data: "12/11/2024",
          tipo: "Consulta",
          descricao: "Sinusite",
          status: "agendado",
          unidade: "UBS Central",
        },
        {
          id: "5",
          data: "15/05/2024",
          tipo: "Exame",
          descricao: "Hemograma Completo",
          status: "concluido",
          unidade: "Laboratório Central",
        },
        {
          id: "6",
          data: "30/06/2024",
          tipo: "Consulta",
          descricao: "Acompanhamento Cardiológico",
          status: "agendado",
          unidade: "Hospital Regional",
        },
        {
          id: "7",
          data: "05/05/2024",
          tipo: "Vacina",
          descricao: "Influenza",
          status: "concluido",
          unidade: "UBS Norte",
        },
        {
          id: "8",
          data: "20/08/2024",
          tipo: "Exame",
          descricao: "Ultrassonografia Abdominal",
          status: "agendado",
          unidade: "Hospital Regional",
        },
      ]
      setOcorrencias(mockOcorrencias)
      setLoading(false)
    }, 1000)
  }, [])

  const filtrarOcorrencias = () => {
    let resultado = [...ocorrencias]

    // Filtro por texto
    if (filtro.trim()) {
      resultado = resultado.filter(
        (ocor) =>
          ocor.descricao.toLowerCase().includes(filtro.toLowerCase()) ||
          ocor.tipo.toLowerCase().includes(filtro.toLowerCase()) ||
          ocor.data.includes(filtro) ||
          ocor.unidade.toLowerCase().includes(filtro.toLowerCase()),
      )
    }

    // Filtro por tipo
    if (tipoFiltro !== "todos") {
      resultado = resultado.filter((ocor) => ocor.tipo.toLowerCase() === tipoFiltro.toLowerCase())
    }

    // Filtro por status
    if (statusFiltro !== "todos") {
      resultado = resultado.filter((ocor) => ocor.status === statusFiltro)
    }

    return resultado
  }

  const ocorrenciasFiltradas = filtrarOcorrencias()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "concluido":
        return <Badge className="bg-green-500 hover:bg-green-600">Concluído</Badge>
      case "em_andamento":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Em andamento</Badge>
      case "agendado":
        return <Badge className="bg-primary hover:bg-primary/90">Agendado</Badge>
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  const getTipoBadge = (tipo: string) => {
    switch (tipo.toLowerCase()) {
      case "consulta":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-900/50"
          >
            Consulta
          </Badge>
        )
      case "exame":
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-900/50"
          >
            Exame
          </Badge>
        )
      case "vacina":
        return (
          <Badge
            variant="outline"
            className="bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-900/50"
          >
            Vacina
          </Badge>
        )
      default:
        return <Badge variant="outline">{tipo}</Badge>
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <SimpleHeader showBackButton backUrl="/dashboard" title="Histórico de Ocorrências" />

      <main className="flex-1 container mx-auto p-4 py-8">
        <Card className="border-none shadow-md overflow-hidden">
          <div className="h-1 bg-primary w-full"></div>
          <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-primary mr-2" />
              <CardTitle className="text-xl font-bold">Histórico de Ocorrências</CardTitle>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  placeholder="Buscar ocorrência..."
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full md:w-auto">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium">Filtrar por</h4>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tipo</label>
                      <Select value={tipoFiltro} onValueChange={setTipoFiltro}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todos os tipos</SelectItem>
                          <SelectItem value="consulta">Consulta</SelectItem>
                          <SelectItem value="exame">Exame</SelectItem>
                          <SelectItem value="vacina">Vacina</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Status</label>
                      <Select value={statusFiltro} onValueChange={setStatusFiltro}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todos os status</SelectItem>
                          <SelectItem value="concluido">Concluído</SelectItem>
                          <SelectItem value="em_andamento">Em andamento</SelectItem>
                          <SelectItem value="agendado">Agendado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Período</label>
                      <div className="flex gap-2">
                        <Input type="date" placeholder="De" className="flex-1" />
                        <Input type="date" placeholder="Até" className="flex-1" />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setTipoFiltro("todos")
                          setStatusFiltro("todos")
                        }}
                      >
                        Limpar
                      </Button>
                      <Button>Aplicar</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Button variant="outline" className="w-full md:w-auto">
                <Calendar className="h-4 w-4 mr-2" />
                Calendário
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
              <Table>
                <TableHeader className="bg-gray-100 dark:bg-gray-800">
                  <TableRow>
                    <TableHead className="font-medium">Data</TableHead>
                    <TableHead className="font-medium">Tipo</TableHead>
                    <TableHead className="font-medium">Descrição</TableHead>
                    <TableHead className="font-medium">Unidade</TableHead>
                    <TableHead className="font-medium">Status</TableHead>
                    <TableHead className="font-medium text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-10">
                        <div className="flex flex-col items-center justify-center">
                          <div className="h-8 w-8 rounded-full border-4 border-t-primary border-primary/30 animate-spin mb-2"></div>
                          <span className="text-gray-500 dark:text-gray-400">Carregando ocorrências...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : ocorrenciasFiltradas.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-10">
                        <div className="flex flex-col items-center justify-center">
                          <FileText className="h-10 w-10 text-gray-400 dark:text-gray-600 mb-2" />
                          <span className="text-gray-500 dark:text-gray-400">Nenhuma ocorrência encontrada.</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    ocorrenciasFiltradas.map((ocorrencia) => (
                      <TableRow
                        key={ocorrencia.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <TableCell>{ocorrencia.data}</TableCell>
                        <TableCell>{getTipoBadge(ocorrencia.tipo)}</TableCell>
                        <TableCell className="font-medium">{ocorrencia.descricao}</TableCell>
                        <TableCell>{ocorrencia.unidade}</TableCell>
                        <TableCell>{getStatusBadge(ocorrencia.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline" className="h-8 px-2">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only md:not-sr-only md:ml-2">Visualizar</span>
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 px-2">
                              <Download className="h-4 w-4" />
                              <span className="sr-only md:not-sr-only md:ml-2">Baixar</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Mostrando {ocorrenciasFiltradas.length} de {ocorrencias.length} ocorrências
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
