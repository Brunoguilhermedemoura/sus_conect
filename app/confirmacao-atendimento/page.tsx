"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search, CheckCircle, XCircle, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Unidade {
  id: string
  nome: string
}

interface Profissional {
  id: string
  nome: string
}

interface Agendamento {
  id: string
  data: string
  hora: string
  paciente: string
  profissional: string
  confirmacao: boolean | null
}

export default function ConfirmacaoAtendimento() {
  const { toast } = useToast()
  const [unidades, setUnidades] = useState<Unidade[]>([])
  const [profissionais, setProfissionais] = useState<Profissional[]>([])
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
  const [unidadeSelecionada, setUnidadeSelecionada] = useState<string>("")
  const [profissionalSelecionado, setProfissionalSelecionado] = useState<string>("")
  const [data, setData] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // Simulando carregamento de dados
    setTimeout(() => {
      const mockUnidades: Unidade[] = [
        { id: "1", nome: "UBS Central" },
        { id: "2", nome: "UBS Norte" },
        { id: "3", nome: "UBS Sul" },
      ]

      const mockProfissionais: Profissional[] = [
        { id: "1", nome: "Dr. João Silva" },
        { id: "2", nome: "Dra. Maria Oliveira" },
        { id: "3", nome: "Dr. Carlos Santos" },
      ]

      const mockAgendamentos: Agendamento[] = [
        {
          id: "1",
          data: "22/05/2024",
          hora: "09:00",
          paciente: "Ana Souza",
          profissional: "Dr. João Silva",
          confirmacao: true,
        },
        {
          id: "2",
          data: "22/05/2024",
          hora: "10:30",
          paciente: "Pedro Almeida",
          profissional: "Dra. Maria Oliveira",
          confirmacao: null,
        },
        {
          id: "3",
          data: "22/05/2024",
          hora: "14:00",
          paciente: "Carla Mendes",
          profissional: "Dr. Carlos Santos",
          confirmacao: false,
        },
        {
          id: "4",
          data: "22/05/2024",
          hora: "15:30",
          paciente: "Roberto Lima",
          profissional: "Dr. João Silva",
          confirmacao: null,
        },
      ]

      setUnidades(mockUnidades)
      setProfissionais(mockProfissionais)
      setAgendamentos(mockAgendamentos)
      setLoading(false)
    }, 1000)
  }, [])

  const buscarAgendamentos = () => {
    setLoading(true)

    // Simulando busca de agendamentos
    setTimeout(() => {
      const mockAgendamentos: Agendamento[] = [
        {
          id: "1",
          data: "22/05/2024",
          hora: "09:00",
          paciente: "Ana Souza",
          profissional: "Dr. João Silva",
          confirmacao: true,
        },
        {
          id: "2",
          data: "22/05/2024",
          hora: "10:30",
          paciente: "Pedro Almeida",
          profissional: "Dra. Maria Oliveira",
          confirmacao: null,
        },
        {
          id: "3",
          data: "22/05/2024",
          hora: "14:00",
          paciente: "Carla Mendes",
          profissional: "Dr. Carlos Santos",
          confirmacao: false,
        },
        {
          id: "4",
          data: "22/05/2024",
          hora: "15:30",
          paciente: "Roberto Lima",
          profissional: "Dr. João Silva",
          confirmacao: null,
        },
      ]

      // Filtragem básica
      let agendamentosFiltrados = [...mockAgendamentos]

      if (unidadeSelecionada && unidadeSelecionada !== "all") {
        // Simulando filtragem por unidade
      }

      if (profissionalSelecionado && profissionalSelecionado !== "all") {
        const profissional = profissionais.find((p) => p.id === profissionalSelecionado)
        if (profissional) {
          agendamentosFiltrados = agendamentosFiltrados.filter((a) => a.profissional === profissional.nome)
        }
      }

      if (data) {
        // Simulando filtragem por data
        agendamentosFiltrados = agendamentosFiltrados.filter((a) => a.data === data)
      }

      setAgendamentos(agendamentosFiltrados)
      setLoading(false)
    }, 1000)
  }

  const confirmarEntrada = (id: string) => {
    setAgendamentos((prev) =>
      prev.map((agendamento) => (agendamento.id === id ? { ...agendamento, confirmacao: true } : agendamento)),
    )

    toast({
      title: "Entrada confirmada",
      description: "A entrada do paciente foi confirmada com sucesso.",
      duration: 3000,
    })
  }

  const cancelarAgendamento = (id: string) => {
    setAgendamentos((prev) =>
      prev.map((agendamento) => (agendamento.id === id ? { ...agendamento, confirmacao: false } : agendamento)),
    )

    toast({
      title: "Agendamento cancelado",
      description: "O agendamento foi cancelado com sucesso.",
      duration: 3000,
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-teal-800 to-teal-900">
      <Header showBackButton backUrl="/atendente" />
      <main className="flex-1 container mx-auto p-6 max-w-6xl">
        <Card className="bg-slate-800/90 border-slate-700 shadow-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-center text-teal-400 flex items-center justify-center gap-2">
              <Calendar className="h-5 w-5" />
              Confirmação de Atendimento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Filtros */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-300">Unidade:</label>
                <Select onValueChange={setUnidadeSelecionada} value={unidadeSelecionada}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-200 h-12">
                    <SelectValue placeholder="Selecione uma unidade" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="all">Todas as unidades</SelectItem>
                    {unidades.map((unidade) => (
                      <SelectItem key={unidade.id} value={unidade.id}>
                        {unidade.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-300">Profissional:</label>
                <Select onValueChange={setProfissionalSelecionado} value={profissionalSelecionado}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-200 h-12">
                    <SelectValue placeholder="Selecione um profissional" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="all">Todos os profissionais</SelectItem>
                    {profissionais.map((profissional) => (
                      <SelectItem key={profissional.id} value={profissional.id}>
                        {profissional.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-300">Data:</label>
                <Input
                  type="date"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-slate-200 h-12"
                  placeholder="dd/mm/aaaa"
                />
              </div>
            </div>

            {/* Botão Buscar */}
            <Button
              onClick={buscarAgendamentos}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white h-12 text-base font-medium"
              disabled={loading}
            >
              <Search className="mr-2 h-4 w-4" />
              {loading ? "Buscando..." : "Buscar"}
            </Button>

            {/* Tabela */}
            <div className="rounded-lg overflow-hidden border border-slate-700">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-700 border-b-0 hover:bg-slate-700">
                    <TableHead className="text-slate-200 font-medium h-12">Data</TableHead>
                    <TableHead className="text-slate-200 font-medium h-12">Hora</TableHead>
                    <TableHead className="text-slate-200 font-medium h-12">Paciente</TableHead>
                    <TableHead className="text-slate-200 font-medium h-12">Profissional</TableHead>
                    <TableHead className="text-slate-200 font-medium h-12">Status</TableHead>
                    <TableHead className="text-slate-200 font-medium h-12">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-slate-300 bg-slate-800">
                        Carregando agendamentos...
                      </TableCell>
                    </TableRow>
                  ) : agendamentos.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-slate-300 bg-slate-800">
                        Nenhum agendamento encontrado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    agendamentos.map((agendamento, index) => (
                      <TableRow
                        key={agendamento.id}
                        className={`border-b border-slate-700 hover:bg-slate-700/50 ${
                          index % 2 === 0 ? "bg-slate-800" : "bg-slate-800/70"
                        }`}
                      >
                        <TableCell className="text-slate-200 h-16">{agendamento.data}</TableCell>
                        <TableCell className="text-slate-200 h-16">{agendamento.hora}</TableCell>
                        <TableCell className="text-slate-200 h-16">{agendamento.paciente}</TableCell>
                        <TableCell className="text-slate-200 h-16">{agendamento.profissional}</TableCell>
                        <TableCell className="h-16">
                          {agendamento.confirmacao === true && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-600 text-white">
                              Confirmado
                            </span>
                          )}
                          {agendamento.confirmacao === false && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-600 text-white">
                              Cancelado
                            </span>
                          )}
                          {agendamento.confirmacao === null && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-600 text-white">
                              Pendente
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="h-16">
                          <div className="flex space-x-2">
                            {agendamento.confirmacao === null && (
                              <>
                                <Button
                                  size="sm"
                                  className="bg-white hover:bg-gray-100 text-teal-600 w-8 h-8 p-0 rounded-full"
                                  onClick={() => confirmarEntrada(agendamento.id)}
                                >
                                  <CheckCircle className="h-4 w-4" />
                                  <span className="sr-only">Confirmar</span>
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-white hover:bg-gray-100 text-red-600 w-8 h-8 p-0 rounded-full"
                                  onClick={() => cancelarAgendamento(agendamento.id)}
                                >
                                  <XCircle className="h-4 w-4" />
                                  <span className="sr-only">Cancelar</span>
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
