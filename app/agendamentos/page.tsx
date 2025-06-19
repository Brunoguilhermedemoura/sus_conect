"use client"

import { useState, useEffect } from "react"
import { SimpleHeader } from "@/components/layout/simple-header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, Clock, User } from "lucide-react"

interface Doutor {
  id: string
  nome: string
}

interface Agendamento {
  id: string
  profissional_nome: string
  hora: string
  status: string
  data_agendamento: string
}

export default function Agendamentos() {
  const [doutores, setDoutores] = useState<Doutor[]>([])
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
  const [doutorSelecionado, setDoutorSelecionado] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      const mockDoutores: Doutor[] = [
        { id: "1", nome: "Dr. João Silva" },
        { id: "2", nome: "Dra. Maria Oliveira" },
        { id: "3", nome: "Dr. Carlos Santos" },
      ]

      const mockAgendamentos: Agendamento[] = [
        {
          id: "1",
          profissional_nome: "Dr. João Silva",
          hora: "09:00",
          status: "Confirmado",
          data_agendamento: "22/05/2024",
        },
        {
          id: "2",
          profissional_nome: "Dra. Maria Oliveira",
          hora: "10:30",
          status: "Pendente",
          data_agendamento: "22/05/2024",
        },
        {
          id: "3",
          profissional_nome: "Dr. Carlos Santos",
          hora: "14:00",
          status: "Confirmado",
          data_agendamento: "23/05/2024",
        },
        {
          id: "4",
          profissional_nome: "Dr. João Silva",
          hora: "15:30",
          status: "Cancelado",
          data_agendamento: "24/05/2024",
        },
      ]

      setDoutores(mockDoutores)
      setAgendamentos(mockAgendamentos)
      setLoading(false)
    }, 1000)
  }, [])

  const filtrarAgendamentos = () => {
    setLoading(true)

    setTimeout(() => {
      if (!doutorSelecionado) {
        const mockAgendamentos: Agendamento[] = [
          {
            id: "1",
            profissional_nome: "Dr. João Silva",
            hora: "09:00",
            status: "Confirmado",
            data_agendamento: "22/05/2024",
          },
          {
            id: "2",
            profissional_nome: "Dra. Maria Oliveira",
            hora: "10:30",
            status: "Pendente",
            data_agendamento: "22/05/2024",
          },
          {
            id: "3",
            profissional_nome: "Dr. Carlos Santos",
            hora: "14:00",
            status: "Confirmado",
            data_agendamento: "23/05/2024",
          },
          {
            id: "4",
            profissional_nome: "Dr. João Silva",
            hora: "15:30",
            status: "Cancelado",
            data_agendamento: "24/05/2024",
          },
        ]
        setAgendamentos(mockAgendamentos)
      } else {
        const doutor = doutores.find((d) => d.id === doutorSelecionado)
        if (doutor) {
          const agendamentosFiltrados = [
            {
              id: "1",
              profissional_nome: doutor.nome,
              hora: "09:00",
              status: "Confirmado",
              data_agendamento: "22/05/2024",
            },
            {
              id: "4",
              profissional_nome: doutor.nome,
              hora: "15:30",
              status: "Cancelado",
              data_agendamento: "24/05/2024",
            },
          ]
          setAgendamentos(agendamentosFiltrados)
        }
      }

      setLoading(false)
    }, 1000)
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmado":
        return (
          <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
            Confirmado
          </Badge>
        )
      case "pendente":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Pendente</Badge>
      case "cancelado":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Cancelado</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-900">
      <SimpleHeader title="Agendamentos" showBackButton backUrl="/dashboard" />

      <main className="container mx-auto px-4 py-8">
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="h-6 w-6 text-emerald-600" />
              Seus Agendamentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Filtros */}
              <Card className="border border-slate-200 dark:border-slate-700">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                        Selecione o Doutor:
                      </label>
                      <Select onValueChange={setDoutorSelecionado} value={doutorSelecionado}>
                        <SelectTrigger className="bg-white dark:bg-slate-800">
                          <SelectValue placeholder="Selecione um doutor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os doutores</SelectItem>
                          {doutores.map((doutor) => (
                            <SelectItem key={doutor.id} value={doutor.id}>
                              {doutor.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button
                        onClick={filtrarAgendamentos}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        disabled={loading}
                      >
                        <Search className="mr-2 h-4 w-4" />
                        {loading ? "Buscando..." : "Buscar"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tabela de Agendamentos */}
              <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-50 dark:bg-slate-800">
                    <TableRow>
                      <TableHead className="text-slate-900 dark:text-white font-semibold">
                        <User className="inline mr-2 h-4 w-4" />
                        Doutor
                      </TableHead>
                      <TableHead className="text-slate-900 dark:text-white font-semibold">
                        <Clock className="inline mr-2 h-4 w-4" />
                        Hora
                      </TableHead>
                      <TableHead className="text-slate-900 dark:text-white font-semibold">Status</TableHead>
                      <TableHead className="text-slate-900 dark:text-white font-semibold">
                        <Calendar className="inline mr-2 h-4 w-4" />
                        Data
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-slate-600 dark:text-slate-400">
                          Carregando agendamentos...
                        </TableCell>
                      </TableRow>
                    ) : agendamentos.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-slate-600 dark:text-slate-400">
                          Nenhum agendamento encontrado.
                        </TableCell>
                      </TableRow>
                    ) : (
                      agendamentos.map((agendamento) => (
                        <TableRow key={agendamento.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <TableCell className="font-medium text-slate-900 dark:text-white">
                            {agendamento.profissional_nome}
                          </TableCell>
                          <TableCell className="text-slate-700 dark:text-slate-300">{agendamento.hora}</TableCell>
                          <TableCell>{getStatusBadge(agendamento.status)}</TableCell>
                          <TableCell className="text-slate-700 dark:text-slate-300">
                            {agendamento.data_agendamento}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
