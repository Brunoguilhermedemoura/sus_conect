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
import { CalendarPlus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { SimpleHeader } from "@/components/layout/simple-header"

interface Especialidade {
  id: string
  nome: string
}

export default function Calendario() {
  const { toast } = useToast()
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [submitting, setSubmitting] = useState<boolean>(false)

  const [formData, setFormData] = useState({
    especialidade: "",
    dataInicio: "",
    dataFim: "",
  })

  useEffect(() => {
    carregarEspecialidades()
  }, [])

  const carregarEspecialidades = () => {
    // Simulando carregamento de dados
    setTimeout(() => {
      const mockEspecialidades: Especialidade[] = [
        { id: "1", nome: "Cardiologia" },
        { id: "2", nome: "Dermatologia" },
        { id: "3", nome: "Ortopedia" },
        { id: "4", nome: "Pediatria" },
        { id: "5", nome: "Neurologia" },
      ]
      setEspecialidades(mockEspecialidades)
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
    if (!formData.especialidade || !formData.dataInicio || !formData.dataFim) {
      toast({
        title: "Erro",
        description: "Todos os campos são obrigatórios.",
        variant: "destructive",
      })
      return
    }

    // Validação de datas
    const dataInicio = new Date(formData.dataInicio)
    const dataFim = new Date(formData.dataFim)

    if (dataInicio > dataFim) {
      toast({
        title: "Erro",
        description: "A data de início não pode ser posterior à data de fim.",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    // Simulando envio de dados
    setTimeout(() => {
      setSubmitting(false)
      toast({
        title: "Sucesso",
        description: "Calendário cadastrado com sucesso!",
      })
      handleReset()
    }, 1000)
  }

  const handleReset = () => {
    setFormData({
      especialidade: "",
      dataInicio: "",
      dataFim: "",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-900">
      <SimpleHeader title="Sistema de Agendamento" showBackButton backUrl="/login" />
      <main className="container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm w-full max-w-md">
          <CardHeader>
            <CardTitle className="space-y-2">Inserir Calendário de Disponibilidade</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="especialidade" className="text-white">
                  Especialidade
                </Label>
                <Select
                  value={formData.especialidade}
                  onValueChange={(value) => handleSelectChange("especialidade", value)}
                >
                  <SelectTrigger className="text-slate-700 dark:text-slate-300text-slate-700 dark:text-slate-300">
                    <SelectValue placeholder="Selecione a especialidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {loading ? (
                      <SelectItem value="loading" disabled>
                        Carregando...
                      </SelectItem>
                    ) : (
                      especialidades.map((especialidade) => (
                        <SelectItem key={especialidade.id} value={especialidade.id}>
                          {especialidade.nome}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataInicio" className="text-white">
                  Data de Início
                </Label>
                <Input
                  id="dataInicio"
                  name="dataInicio"
                  type="date"
                  value={formData.dataInicio}
                  onChange={handleChange}
                  className="text-slate-700 dark:text-slate-300"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="dataFim" className="text-white">
                  Data de Fim
                </Label>
                <Input
                  id="dataFim"
                  name="dataFim"
                  type="date"
                  value={formData.dataFim}
                  onChange={handleChange}
                  className="text-slate-700 dark:text-slate-300"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" disabled={submitting}>
                <CalendarPlus className="mr-2 h-4 w-4" />
                {submitting ? "Inserindo..." : "Inserir Calendário"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
