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
import { useToast } from "@/hooks/use-toast"

export default function TrocarSenha() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    // Simulando uma requisição ao servidor
    setTimeout(() => {
      setLoading(false)

      // Redirecionar para a página de sucesso
      router.push("/senha-alterada")
    }, 2000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 to-blue-700">
      <Header showBackButton backUrl="/menu" />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/10 text-white border-none shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Trocar Senha</CardTitle>
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
                  placeholder="Digite sua nova senha"
                  required
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
                  placeholder="Confirme sua nova senha"
                  required
                  className="bg-white/20 border-white/10 text-white placeholder:text-gray-300"
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                <KeyRound className="mr-2 h-4 w-4" />
                {loading ? "Processando..." : "Confirmar"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
