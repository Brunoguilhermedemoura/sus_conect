"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { SimpleHeader } from "@/components/layout/simple-header"

interface Profissional {
  id: string
  nome: string
}

interface Calendario {
  id: string
  nome: string
}

interface Horario {
  id: string
  calendario: string
  profissional: string
  data: string
  hora: string
  status: string
}

export default function CadastroHorarios() {
  const { toast } = useToast()
  const [profissionais, setProfissionais] = useState<Profissional[]>([])
  const [calendarios, setCalendarios] = useState<Calendario[]>([])
  const [horarios, setHorarios] = useState<Horario[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [submitting, setSubmitting] = useState<boolean>(false)

  const [formData, setFormData] = useState({
    calendario: "",
    profissional: "",
    data: "",
    hora: "",
    status: "disponível",
  })

  useEffect(() => {
    carregarProfissionais()
    carregarCalendarios()
    carregarHorarios()
  }, [])

  const carregarProfissionais = () => {
    // Simulando carregamento de dados
    setTimeout(() => {
      const mockProfissionais: Profissional[] = [
        { id: "1", nome: "Dr. João Silva" },
        { id: "2", nome: "Dra. Maria Oliveira" },
        { id: "3", nome: "Dr. Carlos Santos" },
        { id: "4", nome: "Dra. Ana Pereira" },
      ]
      setProfissionais(mockProfissionais)
    }, 1000)
  }

  const carregarCalendarios = () => {
    // Simulando carregamento de dados
    setTimeout(() => {
      const mockCalendarios: Calendario[] = [
        { id: "1", nome: "Calendário Cardiologia - Maio 2024" },
        { id: "2", nome: "Calendário Dermatologia - Maio 2024" },
        { id: "3", nome: "Calendário Ortopedia - Maio 2024" },
        { id: "4", nome: "Calendário Pediatria - Maio 2024" },
      ]
      setCalendarios(mockCalendarios)
    }, 1000)
  }

  const carregarHorarios = () => {
    setLoading(true)
    // Simulando carregamento de dados
    setTimeout(() => {
      const mockHorarios: Horario[] = [
        {
          id: "1",
          calendario: "Calendário Cardiologia - Maio 2024",
          profissional: "Dr. João Silva",
          data: "2024-05-15",
          hora: "08:00",
          status: "disponível",
        },
        {
          id: "2",
          calendario: "Calendário Dermatologia - Maio 2024",
          profissional: "Dra. Maria Oliveira",
          data: "2024-05-16",
          hora: "09:30",
          status: "reservado",
        },
        {
          id: "3",
          calendario: "Calendário Ortopedia - Maio 2024",
          profissional: "Dr. Carlos Santos",
          data: "2024-05-17",
          hora: "14:00",
          status: "disponível",
        },
      ]
      setHorarios(mockHorarios)
      setLoading(false)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validação básica
    if (!formData.calendario || !formData.profissional || !formData.data || !formData.hora) {
      toast({
        title: "Erro",
        description: "Todos os campos são obrigatórios.",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    // Simulando envio de dados
    setTimeout(() => {
      const calendarioSelecionado = calendarios.find((c) => c.id === formData.calendario)
      const profissionalSelecionado = profissionais.find((p) => p.id === formData.profissional)

      // Adicionar novo horário com ID simulado
      const novoHorario: Horario = {
        id: (horarios.length + 1).toString(),
        calendario: calendarioSelecionado?.nome || "",
        profissional: profissionalSelecionado?.nome || "",
        data: formData.data,
        hora: formData.hora,
        status: formData.status,
      }

      setHorarios([...horarios, novoHorario])
      setFormData({
        calendario: "",
        profissional: "",
        data: "",
        hora: "",
        status: "disponível",
      })

      setSubmitting(false)
      toast({
        title: "Sucesso",
        description: "Horário cadastrado com sucesso!",
      })
    }, 1000)
  }

  const excluirHorario = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este horário?")) {
      setLoading(true)
      // Simulando exclusão
      setTimeout(() => {
        setHorarios(horarios.filter((h) => h.id !== id))
        setLoading(false)
        toast({
          title: "Sucesso",
          description: "Horário excluído com sucesso!",
        })
      }, 500)
    }
  }

  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return data.toLocaleDateString("pt-BR")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-900">
      <SimpleHeader title="Sistema de Agendamento" showBackButton backUrl="/configuracoes" />
      <main className="container mx-auto px-4 py-8 grid grid-cols-1 items-start">
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm w-full mb-8">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-center">Inserir Horários Disponíveis</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="calendario" className="text-slate-700 dark:text-slate-300text-slate-700 dark:text-slate-300">
                    Calendário
                  </Label>
                  <Select
                    value={formData.calendario}
                    onValueChange={(value) => handleSelectChange("calendario", value)}
                  >
                    <SelectTrigger className="text-slate-700 dark:text-slate-300text-slate-700 dark:text-slate-300">
                      <SelectValue placeholder="Selecione o calendário" />
                    </SelectTrigger>
                    <SelectContent>
                      {calendarios.map((calendario) => (
                        <SelectItem key={calendario.id} value={calendario.id}>
                          {calendario.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profissional" className="text-slate-700 dark:text-slate-300text-slate-700 dark:text-slate-300">
                    Profissional
                  </Label>
                  <Select
                    value={formData.profissional}
                    onValueChange={(value) => handleSelectChange("profissional", value)}
                  >
                    <SelectTrigger className="text-slate-700 dark:text-slate-300text-slate-700 dark:text-slate-300">
                      <SelectValue placeholder="Selecione o profissional" />
                    </SelectTrigger>
                    <SelectContent>
                      {profissionais.map((profissional) => (
                        <SelectItem key={profissional.id} value={profissional.id}>
                          {profissional.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data" className="text-slate-700 dark:text-slate-300text-slate-700 dark:text-slate-300">
                    Data
                  </Label>
                  <Input
                    id="data"
                    name="data"
                    type="date"
                    value={formData.data}
                    onChange={handleChange}
                    className="text-slate-700 dark:text-slate-300text-slate-700 dark:text-slate-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hora" className="text-slate-700 dark:text-slate-300text-slate-700 dark:text-slate-300">
                    Hora
                  </Label>
                  <Input
                    id="hora"
                    name="hora"
                    type="time"
                    value={formData.hora}
                    onChange={handleChange}
                    className="text-slate-700 dark:text-slate-300text-slate-700 dark:text-slate-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-slate-700 dark:text-slate-300text-slate-700 dark:text-slate-300">
                    Status
                  </Label>
                  <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                    <SelectTrigger className="text-slate-700 dark:text-slate-300text-slate-700 dark:text-slate-300">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="disponível">Disponível</SelectItem>
                      <SelectItem value="reservado">Reservado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full flex-1 dark:text-slate-300text-slate-700 dark:text-slate-300" disabled={submitting}>
                <Plus className="text-slate dark:text-slate-300text-slate-700 dark:text-slate-300" />
                {submitting ? "Inserindo..." : "Inserir Horário"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm w-full text-slate-700 dark:text-slate-300 mb-8">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-center">Horários Cadastrados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg overflow-hidden overflow-x-auto">
              <Table>
                <TableHeader className="bg-primary">
                  <TableRow>
                    <TableHead className="text-white">ID</TableHead>
                    <TableHead className="text-white">Calendário</TableHead>
                    <TableHead className="text-white">Profissional</TableHead>
                    <TableHead className="text-white">Data</TableHead>
                    <TableHead className="text-white">Hora</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-white">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-slate-700 dark:text-slate-300text-slate-700 dark:text-slate-300">
                        Carregando horários...
                      </TableCell>
                    </TableRow>
                  ) : horarios.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-slate-700 dark:text-slate-300text-slate-700 dark:text-slate-300">
                        Nenhum horário cadastrado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    horarios.map((horario) => (
                      <TableRow key={horario.id} className="text-slate-700 dark:text-slate-300text-slate-700 dark:text-slate-300">
                        <TableCell className="text-slate-700 dark:text-slate-300text-slate-700 dark:text-slate-300">{horario.id}</TableCell>
                        <TableCell className="text-slate-700 dark:text-slate-300text-slate-700 dark:text-slate-300">{horario.calendario}</TableCell>
                        <TableCell className="text-slate-700 dark:text-slate-300text-slate-700 dark:text-slate-300">{horario.profissional}</TableCell>
                        <TableCell className="text-slate-700 dark:text-slate-300text-slate-700 dark:text-slate-300">{formatarData(horario.data)}</TableCell>
                        <TableCell className="text-slate-700 dark:text-slate-300text-slate-700 dark:text-slate-300">{horario.hora}</TableCell>
                        <TableCell className="text-slate-700 dark:text-slate-300text-slate-700 dark:text-slate-300">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              horario.status === "disponível"
                                ? "bg-green-500/20 text-green-200"
                                : "bg-yellow-500/20 text-yellow-200"
                            }`}
                          >
                            {horario.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="destructive" onClick={() => excluirHorario(horario.id)}>
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Excluir</span>
                          </Button>
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
