"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { UserPlus, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CriarLogin() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    cpf: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validação básica
    if (!formData.cpf.trim() || !formData.email.trim() || !formData.senha || !formData.confirmarSenha) {
      setStatus({
        type: "error",
        message: "Por favor, preencha todos os campos.",
      })
      return
    }

    // Validação de CPF
    if (!/^\d{11}$/.test(formData.cpf)) {
      setStatus({
        type: "error",
        message: "CPF inválido. Digite apenas os 11 números.",
      })
      return
    }

    // Validação de senhas
    if (formData.senha !== formData.confirmarSenha) {
      setStatus({
        type: "error",
        message: "As senhas não coincidem.",
      })
      return
    }

    setLoading(true)
    setStatus(null)

    // Simulando uma requisição ao servidor
    setTimeout(() => {
      setLoading(false)
      setStatus({
        type: "success",
        message: "Cadastro realizado com sucesso! Redirecionando...",
      })

      // Redirecionar após 2 segundos
      setTimeout(() => {
        router.push("/cadastro-confirmado")
      }, 2000)
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 to-blue-700">
      <Header showBackButton backUrl="/login" />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/10 text-white border-none shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <UserPlus className="h-6 w-6" />
              Criar Login
            </CardTitle>
            <CardDescription className="text-gray-200">Crie seu acesso ao sistema de agendamento</CardDescription>
          </CardHeader>
          <CardContent>
            {status && (
              <Alert
                className={`mb-4 ${
                  status.type === "success" ? "bg-green-500/20 text-green-200" : "bg-red-500/20 text-red-200"
                } border-none`}
              >
                <AlertDescription>{status.message}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  placeholder="Digite apenas os números"
                  maxLength={11}
                  className="bg-white/20 border-white/10 text-white placeholder:text-gray-300"
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
                  className="bg-white/20 border-white/10 text-white placeholder:text-gray-300"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <Input
                  id="senha"
                  name="senha"
                  type="password"
                  value={formData.senha}
                  onChange={handleChange}
                  placeholder="Digite sua senha"
                  className="bg-white/20 border-white/10 text-white placeholder:text-gray-300"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
                <Input
                  id="confirmarSenha"
                  name="confirmarSenha"
                  type="password"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  placeholder="Confirme sua senha"
                  className="bg-white/20 border-white/10 text-white placeholder:text-gray-300"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                {loading ? "Processando..." : "Confirmar"}
              </Button>

              <div className="text-center mt-4">
                <Link
                  href="/login"
                  className="text-blue-300 hover:text-blue-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar para login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
