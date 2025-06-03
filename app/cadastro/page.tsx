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
import { UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"
import { SimpleHeader } from "@/components/layout/simple-header"

interface Estado {
  id: string
  nome: string
}

interface Cidade {
  id: string
  nome: string
}

export default function Cadastro() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nome: "",
    numero_sus: "",
    cpf: "",
    rg: "",
    email: "",
    ddd: "",
    telefone: "",
    cep: "",
    endereco: "",
    numero: "",
    bairro: "",
    estado: "",
    cidade: "",
  })

  const [estados, setEstados] = useState<Estado[]>([])
  const [cidades, setCidades] = useState<Cidade[]>([])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ tipo: "success" | "error"; mensagem: string } | null>(null)

  // Simular carregamento de estados
  useEffect(() => {
    const mockEstados: Estado[] = [
      { id: "1", nome: "São Paulo" },
      { id: "2", nome: "Rio de Janeiro" },
      { id: "3", nome: "Minas Gerais" },
      { id: "4", nome: "Bahia" },
      { id: "5", nome: "Rio Grande do Sul" },
    ]
    setEstados(mockEstados)
  }, [])

  // Carregar cidades quando o estado mudar
  useEffect(() => {
    if (formData.estado) {
      // Simulando carregamento de cidades
      const mockCidades: Cidade[] = [
        { id: "1", nome: "São Paulo" },
        { id: "2", nome: "Campinas" },
        { id: "3", nome: "Santos" },
        { id: "4", nome: "Ribeirão Preto" },
        { id: "5", nome: "São José dos Campos" },
      ]
      setCidades(mockCidades)
    } else {
      setCidades([])
    }
  }, [formData.estado])

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
    if (!formData.cpf || !formData.rg || !formData.email) {
      setStatus({
        tipo: "error",
        mensagem: "Por favor, preencha todos os campos obrigatórios.",
      })
      return
    }

    setLoading(true)

    // Simulando envio para o servidor
    setTimeout(() => {
      setLoading(false)
      setStatus({
        tipo: "success",
        mensagem: "Cadastro realizado com sucesso! Redirecionando...",
      })

      // Redirecionar após 2 segundos
      setTimeout(() => {
        router.push("/cadastro-confirmado")
      }, 2000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-900">
      <SimpleHeader title="Sistema de Agendamento" showBackButton backUrl="/login" /> 
      <main className="container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <UserPlus className="h-6 w-6" />
              Cadastro de Usuário
            </CardTitle>
            <CardDescription className="text-slate-700 dark:text-slate-300 text-center">
              Preencha seus dados pessoais para cadastro no sistema
            </CardDescription>

          </CardHeader>
          <CardContent>
            {status && (
              <Alert
                className={`mb-4 ${
                  status.tipo === "success" ? "bg-green-500/20 text-green-200" : "bg-red-500/20 text-red-200"
                } border-none`}
              >
                <AlertDescription>{status.mensagem}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Digite seu nome completo"
                    className="text-slate-700 dark:text-slate-300text-slate-700 dark:text-slate-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numero_sus">Número do SUS</Label>
                  <Input
                    id="numero_sus"
                    name="numero_sus"
                    value={formData.numero_sus}
                    onChange={handleChange}
                    placeholder="Digite o número do cartão SUS"
                    className="text-slate-700 dark:text-slate-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                    placeholder="Digite seu CPF"
                    maxLength={11}
                    className="text-slate-700 dark:text-slate-300"
                    required
                  />
                  <p className="text-xs text-red-300">**Informe o mesmo CPF do login**</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rg">RG</Label>
                  <Input
                    id="rg"
                    name="rg"
                    value={formData.rg}
                    onChange={handleChange}
                    placeholder="Digite seu RG"
                    className="text-slate-700 dark:text-slate-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Digite seu e-mail"
                    className="text-slate-700 dark:text-slate-300"
                    required
                  />
                  <p className="text-xs text-red-300">**Informe o mesmo e-mail do login**</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="ddd">DDD</Label>
                    <Input
                      id="ddd"
                      name="ddd"
                      value={formData.ddd}
                      onChange={handleChange}
                      placeholder="DDD"
                      maxLength={2}
                      className="text-slate-700 dark:text-slate-300"
                      required
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      placeholder="Digite seu telefone"
                      className="text-slate-700 dark:text-slate-300"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    name="cep"
                    value={formData.cep}
                    onChange={handleChange}
                    placeholder="Digite seu CEP"
                    className="text-slate-700 dark:text-slate-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input
                    id="endereco"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleChange}
                    placeholder="Digite seu endereço"
                    className="text-slate-700 dark:text-slate-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numero">Número</Label>
                  <Input
                    id="numero"
                    name="numero"
                    value={formData.numero}
                    onChange={handleChange}
                    placeholder="Número"
                    className="text-slate-700 dark:text-slate-300text-slate-700 dark:text-slate-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bairro">Bairro</Label>
                  <Input
                    id="bairro"
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleChange}
                    placeholder="Digite seu bairro"
                    className="text-slate-700 dark:text-slate-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Select value={formData.estado} onValueChange={(value) => handleSelectChange("estado", value)}>
                    <SelectTrigger className="text-slate-700 dark:text-slate-300">
                      <SelectValue placeholder="Selecione o estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {estados.map((estado) => (
                        <SelectItem key={estado.id} value={estado.id}>
                          {estado.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Select
                    value={formData.cidade}
                    onValueChange={(value) => handleSelectChange("cidade", value)}
                    disabled={!formData.estado}
                  >
                    <SelectTrigger className="text-slate-700 dark:text-slate-300">
                      <SelectValue placeholder="Selecione a cidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {cidades.map((cidade) => (
                        <SelectItem key={cidade.id} value={cidade.id}>
                          {cidade.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" disabled={loading}>
                {loading ? "Processando..." : "Salvar"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
