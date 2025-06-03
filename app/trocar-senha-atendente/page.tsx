"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { KeyRound } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function TrocarSenhaAtendente() {
  const router = useRouter()
  const [senhaAtual, setSenhaAtual] = useState("")
  const [novaSenha, setNovaSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [loading, setLoading] = useState<boolean>(false)
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (novaSenha !== confirmarSenha) {
      setStatus({ type: "error", message: "As senhas não coincidem." })
      return
    }

    if (novaSenha.length < 6) {
      setStatus({ type: "error", message: "A nova senha deve ter pelo menos 6 caracteres." })
      return
    }

    setLoading(true)
    setStatus({ type: null, message: "" })

    // Simulando uma requisição ao servidor
    setTimeout(() => {
      setLoading(false)
      setStatus({ type: "success", message: "Senha alterada com sucesso!" })

      setTimeout(() => {
        router.push("/atendente")
      }, 2000)
    }, 2000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 to-blue-700">
      <Header showBackButton backUrl="/atendente" />
      <main className="flex-1 container mx-auto p-4 grid md:grid-cols-3 gap-6">
        <Card className="bg-white/10 text-white border-none shadow-xl md:col-span-2">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <KeyRound className="h-6 w-6" />
              Trocar Senha
            </CardTitle>
            <CardDescription className="text-gray-200">
              Preencha os campos abaixo para alterar sua senha
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="senha-atual" className="text-white">
                  Senha Atual
                </Label>
                <Input
                  id="senha-atual"
                  type="password"
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                  placeholder="Digite sua senha atual"
                  required
                  className="bg-white/20 border-white/10 text-white placeholder:text-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nova-senha" className="text-white">
                  Nova Senha
                </Label>
                <Input
                  id="nova-senha"
                  type="password"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  placeholder="Digite sua nova senha"
                  required
                  minLength={6}
                  className="bg-white/20 border-white/10 text-white placeholder:text-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmar-senha" className="text-white">
                  Confirmar Nova Senha
                </Label>
                <Input
                  id="confirmar-senha"
                  type="password"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  placeholder="Confirme sua nova senha"
                  required
                  minLength={6}
                  className="bg-white/20 border-white/10 text-white placeholder:text-gray-300"
                />
              </div>

              {status.type && (
                <Alert
                  className={`
                    ${status.type === "success" ? "bg-green-500/20 text-green-200" : ""} 
                    ${status.type === "error" ? "bg-red-500/20 text-red-200" : ""}
                    border-none
                  `}
                >
                  <AlertDescription>{status.message}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                <KeyRound className="mr-2 h-4 w-4" />
                {loading ? "Processando..." : "Confirmar"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-white/10 text-white border-none shadow-xl h-fit">
          <CardHeader>
            <CardTitle className="text-xl">Dicas de Segurança</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-sm">• Use pelo menos 6 caracteres</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-sm">• Combine letras e números</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-sm">• Evite informações pessoais</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-sm">• Não compartilhe sua senha</p>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
