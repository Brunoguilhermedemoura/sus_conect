"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { SimpleHeader } from "@/components/layout/simple-header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, RefreshCw, Search, UserPlus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface Especialidade {
  id: string
  nome: string
}

interface Unidade {
  id: string
  nome: string
}

export default function CadastroProfissionais() {
  const { toast } = useToast()
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([])
  const [unidades, setUnidades] = useState<Unidade[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [submitting, setSubmitting] = useState<boolean>(false)

  const [formData, setFormData] = useState({
    nome: "",
    especialidade: "",
    unidade: "",
    cpf: "",
    registro: "",
    telefone: "",
    email: "",
  })

  useEffect(() => {
    carregarEspecialidades()
    carregarUnidades()
  }, [])

  const carregarEspecialidades = () => {
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

  const carregarUnidades = () => {
    setTimeout(() => {
      const mockUnidades: Unidade[] = [
        { id: "1", nome: "UBS Central" },
        { id: "2", nome: "UBS Vila Mariana" },
        { id: "3", nome: "UBS Copacabana" },
        { id: "4", nome: "UBS Centro" },
      ]
      setUnidades(mockUnidades)
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

    if (!formData.nome || !formData.especialidade || !formData.unidade || !formData.cpf || !formData.registro) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      toast({
        title: "Sucesso",
        description: "Profissional cadastrado com sucesso!",
      })
      handleReset()
    }, 1000)
  }

  const handleReset = () => {
    setFormData({
      nome: "",
      especialidade: "",
      unidade: "",
      cpf: "",
      registro: "",
      telefone: "",
      email: "",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-900">
      <SimpleHeader title="Cadastro de Profissionais" showBackButton backUrl="/configuracoes" /> 

      <main className="container mx-auto px-4 py-8">
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-900 dark:text-white flex items-center gap-2">
              <UserPlus className="h-6 w-6 text-emerald-600" />
              Cadastro de Profissionais de Saúde
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-slate-700 dark:text-slate-300">
                    Nome Completo
                  </Label>
                  <Input
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Digite o nome completo"
                    className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="especialidade" className="text-slate-700 dark:text-slate-300">
                    Especialidade
                  </Label>
                  <Select
                    value={formData.especialidade}
                    onValueChange={(value) => handleSelectChange("especialidade", value)}
                  >
                    <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
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
                  <Label htmlFor="unidade" className="text-slate-700 dark:text-slate-300">
                    Unidade de Saúde
                  </Label>
                  <Select value={formData.unidade} onValueChange={(value) => handleSelectChange("unidade", value)}>
                    <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                      <SelectValue placeholder="Selecione a unidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {loading ? (
                        <SelectItem value="loading" disabled>
                          Carregando...
                        </SelectItem>
                      ) : (
                        unidades.map((unidade) => (
                          <SelectItem key={unidade.id} value={unidade.id}>
                            {unidade.nome}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf" className="text-slate-700 dark:text-slate-300">
                    CPF
                  </Label>
                  <Input
                    id="cpf"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                    placeholder="Digite o CPF"
                    maxLength={11}
                    className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registro" className="text-slate-700 dark:text-slate-300">
                    Registro Profissional (CRM, CRN, etc.)
                  </Label>
                  <Input
                    id="registro"
                    name="registro"
                    value={formData.registro}
                    onChange={handleChange}
                    placeholder="Digite o registro profissional"
                    className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone" className="text-slate-700 dark:text-slate-300">
                    Telefone
                  </Label>
                  <Input
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    placeholder="Digite o telefone"
                    className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Digite o email"
                    className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                  disabled={submitting}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {submitting ? "Cadastrando..." : "Cadastrar"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-slate-200 dark:border-slate-700"
                  onClick={handleReset}
                  disabled={submitting}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Limpar
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-900"
                  asChild
                >
                  <Link href="/consulta-profissionais">
                    <Search className="mr-2 h-4 w-4" />
                    Consultar Cadastros
                  </Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
