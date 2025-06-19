"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CalendarClock, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { SimpleHeader } from "@/components/layout/simple-header"

interface Unidade {
  id: string
  nome: string
}

interface Especialidade {
  id: string
  nome: string
}

interface Profissional {
  id: string
  nome: string
}

interface Horario {
  id: string
  data: string
  hora: string
}

export default function Agendamento() {
  const { toast } = useToast()
  const [rg, setRg] = useState("")
  const [unidades, setUnidades] = useState<Unidade[]>([])
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([])
  const [profissionais, setProfissionais] = useState<Profissional[]>([])
  const [horarios, setHorarios] = useState<Horario[]>([])

  const [unidadeSelecionada, setUnidadeSelecionada] = useState("")
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState("")
  const [profissionalSelecionado, setProfissionalSelecionado] = useState("")
  const [horarioSelecionado, setHorarioSelecionado] = useState("")

  const [rgValidado, setRgValidado] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mensagem, setMensagem] = useState<{ tipo: "success" | "error"; texto: string } | null>(null)

  // Simular carregamento de dados
  useEffect(() => {
    // Dados de exemplo
    const mockUnidades: Unidade[] = [
      { id: "1", nome: "UBS Central" },
      { id: "2", nome: "UBS Vila Mariana" },
      { id: "3", nome: "UBS Copacabana" },
    ]
    setUnidades(mockUnidades)
  }, [])

  const validarRg = () => {
    if (!rg.trim()) {
      setMensagem({ tipo: "error", texto: "Por favor, informe o RG." })
      return
    }

    setLoading(true)

    // Simulando validação
    setTimeout(() => {
      setLoading(false)
      setRgValidado(true)
      setMensagem(null)
    }, 1000)
  }

  const carregarEspecialidades = () => {
    if (!unidadeSelecionada) return

    setLoading(true)

    // Simulando carregamento
    setTimeout(() => {
      const mockEspecialidades: Especialidade[] = [
        { id: "1", nome: "Cardiologia" },
        { id: "2", nome: "Dermatologia" },
        { id: "3", nome: "Ortopedia" },
      ]
      setEspecialidades(mockEspecialidades)
      setLoading(false)
    }, 1000)
  }

  const carregarProfissionais = () => {
    if (!especialidadeSelecionada) return

    setLoading(true)

    // Simulando carregamento
    setTimeout(() => {
      const mockProfissionais: Profissional[] = [
        { id: "1", nome: "Dr. João Silva" },
        { id: "2", nome: "Dra. Maria Oliveira" },
        { id: "3", nome: "Dr. Carlos Santos" },
      ]
      setProfissionais(mockProfissionais)
      setLoading(false)
    }, 1000)
  }

  const carregarHorarios = () => {
    if (!profissionalSelecionado) return

    setLoading(true)

    // Simulando carregamento
    setTimeout(() => {
      const mockHorarios: Horario[] = [
        { id: "1", data: "22/05/2024", hora: "09:00" },
        { id: "2", data: "22/05/2024", hora: "10:30" },
        { id: "3", data: "23/05/2024", hora: "14:00" },
      ]
      setHorarios(mockHorarios)
      setLoading(false)
    }, 1000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!horarioSelecionado) {
      setMensagem({ tipo: "error", texto: "Por favor, selecione um horário." })
      return
    }

    setLoading(true)

    // Simulando agendamento
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Agendamento realizado com sucesso!",
        description: "Você receberá um e-mail com os detalhes da sua consulta.",
      })

      // Limpar formulário
      setRg("")
      setUnidadeSelecionada("")
      setEspecialidadeSelecionada("")
      setProfissionalSelecionado("")
      setHorarioSelecionado("")
      setRgValidado(false)
      setEspecialidades([])
      setProfissionais([])
      setHorarios([])
    }, 1500)
  }

  // Efeitos para carregar dados quando seleções mudam
  useEffect(() => {
    if (unidadeSelecionada) {
      carregarEspecialidades()
    }
  }, [unidadeSelecionada])

  useEffect(() => {
    if (especialidadeSelecionada) {
      carregarProfissionais()
    }
  }, [especialidadeSelecionada])

  useEffect(() => {
    if (profissionalSelecionado) {
      carregarHorarios()
    }
  }, [profissionalSelecionado])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-900">
      <SimpleHeader title="Sistema de Agendamento" showBackButton backUrl="/menu" />
      <main className="container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <CalendarClock className="h-6 w-6" />
              Agendamento de Consultas
            </CardTitle>
            <CardDescription className="text-slate-700 dark:text-slate-300 text-center">Agende sua consulta de forma rápida e prática</CardDescription>
          </CardHeader>
          <CardContent>
            {mensagem && (
              <Alert
                className={`mb-4 ${
                  mensagem.tipo === "success" ? "bg-green-500/20 text-green-200" : "bg-red-500/20 text-red-200"
                } border-none`}
              >
                <AlertDescription>{mensagem.texto}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="rg">Informe seu RG</Label>
                <div className="flex gap-2">
                  <Input
                    id="rg"
                    value={rg}
                    onChange={(e) => setRg(e.target.value)}
                    placeholder="Digite o RG"
                    className="text-slate-700 dark:text-slate-300text-slate-700 dark:text-slate-300"
                    disabled={rgValidado || loading}
                    required
                  />
                  {!rgValidado && (
                    <Button
                      type="button"
                      onClick={validarRg}
                      className="text-slate-700 dark:text-slate-300text-slate-700 dark:text-slate-300"
                      disabled={loading}
                    >
                      <Search className="h-4 w-4" />
                      <span className="sr-only">Validar</span>
                    </Button>
                  )}
                </div>
              </div>

              {rgValidado && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="unidade">Selecione a Unidade</Label>
                    <Select value={unidadeSelecionada} onValueChange={setUnidadeSelecionada} disabled={loading}>
                      <SelectTrigger className="text-slate-700 dark:text-slate-300text-slate-700 dark:text-slate-300">
                        <SelectValue placeholder="Selecione a unidade" />
                      </SelectTrigger>
                      <SelectContent>
                        {unidades.map((unidade) => (
                          <SelectItem key={unidade.id} value={unidade.id}>
                            {unidade.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {unidadeSelecionada && (
                    <div className="space-y-2">
                      <Label htmlFor="especialidade">Selecione a Especialidade</Label>
                      <Select
                        value={especialidadeSelecionada}
                        onValueChange={setEspecialidadeSelecionada}
                        disabled={loading || especialidades.length === 0}
                      >
                        <SelectTrigger className="text-slate-700 dark:text-slate-300text-slate-700 dark:text-slate-300">
                          <SelectValue placeholder="Selecione a especialidade" />
                        </SelectTrigger>
                        <SelectContent>
                          {especialidades.map((especialidade) => (
                            <SelectItem key={especialidade.id} value={especialidade.id}>
                              {especialidade.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {especialidadeSelecionada && (
                    <div className="space-y-2">
                      <Label htmlFor="profissional">Selecione o Profissional</Label>
                      <Select
                        value={profissionalSelecionado}
                        onValueChange={setProfissionalSelecionado}
                        disabled={loading || profissionais.length === 0}
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
                  )}

                  {profissionalSelecionado && (
                    <div className="space-y-2">
                      <Label htmlFor="horario">Selecione o Horário</Label>
                      <Select
                        value={horarioSelecionado}
                        onValueChange={setHorarioSelecionado}
                        disabled={loading || horarios.length === 0}
                      >
                        <SelectTrigger className="text-slate-700 dark:text-slate-300text-slate-700 dark:text-slate-300">
                          <SelectValue placeholder="Selecione o horário" />
                        </SelectTrigger>
                        <SelectContent>
                          {horarios.map((horario) => (
                            <SelectItem key={horario.id} value={horario.id}>
                              {horario.data} - {horario.hora}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {horarioSelecionado && (
                    <Button type="submit" className="text-slate-700 dark:text-slate-300text-slate-700 dark:text-slate-300" disabled={loading}>
                      {loading ? "Processando..." : "Agendar Consulta"}
                    </Button>
                  )}
                </>
              )}
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
