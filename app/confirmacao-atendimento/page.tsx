"use client"

import { useState, useEffect } from "react"
import { SimpleHeader } from "@/components/layout/simple-header"
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
  const [unidadeSelecionada, setUnidadeSelecionada] = useState<string>("all")
  const [profissionalSelecionado, setProfissionalSelecionado] = useState<string>("all")
  const [data, setData] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
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

      let agendamentosFiltrados = [...mockAgendamentos]

      if (profissionalSelecionado !== "all") {
        const profissional = profissionais.find((p) => p.id === profissionalSelecionado)
        if (profissional) {
          agendamentosFiltrados = agendamentosFiltrados.filter((a) => a.profissional === profissional.nome)
        }
      }

      if (data) {
        agendamentosFiltrados = agendamentosFiltrados.filter((a) => a.data === data)
      }

      setAgendamentos(agendamentosFiltrados)
      setLoading(false)
    }, 1000)
  }

  const confirmarEntrada = (id: string) => {
    setAgendamentos((prev) =>
      prev.map((a) => (a.id === id ? { ...a, confirmacao: true } : a))
    )
    toast({ title: "Entrada confirmada", description: "Paciente confirmado com sucesso." })
  }

  const cancelarAgendamento = (id: string) => {
    setAgendamentos((prev) =>
      prev.map((a) => (a.id === id ? { ...a, confirmacao: false } : a))
    )
    toast({ title: "Agendamento cancelado", description: "Paciente teve agendamento cancelado." })
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-900">
      <SimpleHeader title="Confirmação de Atendimento" showBackButton backUrl="/atendente" />
      <main className="flex-1 container mx-auto p-6 max-w-6xl">
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-center text-slate-900 dark:text-white flex items-center justify-center gap-2">
              <Calendar className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              Confirmação de Atendimento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-700 dark:text-slate-300">Unidade:</label>
                <Select value={unidadeSelecionada} onValueChange={setUnidadeSelecionada}>
                  <SelectTrigger className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 h-12">
                    <SelectValue placeholder="Selecione uma unidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as unidades</SelectItem>
                    {unidades.map((u) => (
                      <SelectItem key={u.id} value={u.id}>{u.nome}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-700 dark:text-slate-300">Profissional:</label>
                <Select value={profissionalSelecionado} onValueChange={setProfissionalSelecionado}>
                  <SelectTrigger className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 h-12">
                    <SelectValue placeholder="Selecione um profissional" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os profissionais</SelectItem>
                    {profissionais.map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.nome}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-700 dark:text-slate-300">Data:</label>
                <Input
                  type="date"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 h-12"
                />
              </div>
            </div>
            <Button onClick={buscarAgendamentos} className="w-full bg-emerald-600 hover:bg-emerald-700">
              <Search className="mr-2 h-4 w-4" /> Buscar Agendamentos
            </Button>
            <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-100 dark:bg-slate-700">
                    <TableHead>Data</TableHead>
                    <TableHead>Hora</TableHead>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Profissional</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-slate-500 dark:text-slate-400">
                        Carregando...
                      </TableCell>
                    </TableRow>
                  ) : agendamentos.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-slate-500 dark:text-slate-400">
                        Nenhum agendamento encontrado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    agendamentos.map((a) => (
                      <TableRow key={a.id} className="bg-white dark:bg-slate-800">
                        <TableCell>{a.data}</TableCell>
                        <TableCell>{a.hora}</TableCell>
                        <TableCell>{a.paciente}</TableCell>
                        <TableCell>{a.profissional}</TableCell>
                        <TableCell>
                          {a.confirmacao === true ? (
                            <span className="text-green-600 font-semibold">Confirmado</span>
                          ) : a.confirmacao === false ? (
                            <span className="text-red-600 font-semibold">Cancelado</span>
                          ) : (
                            <span className="text-yellow-600 font-semibold">Pendente</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {a.confirmacao === null && (
                            <div className="flex gap-2">
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => confirmarEntrada(a.id)}>
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => cancelarAgendamento(a.id)}>
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
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
