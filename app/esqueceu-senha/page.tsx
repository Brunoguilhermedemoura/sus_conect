"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { SimpleHeader } from "@/components/layout/simple-header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"  // Importando o ícone LogIn corretamente

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message)
        router.push("/senha-redefinida-sucesso")
      } else {
        setMessage(data.error || "Erro ao processar a solicitação.")
      }
    } catch (error) {
      console.error("Erro:", error)
      setMessage("Ocorreu um erro inesperado.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-900 flex flex-col justify-between">
      <SimpleHeader title="Sistema de Agendamento" showBackButton backUrl="/login" />

      <main className="container mx-auto px-4 py-8 flex items-center justify-center flex-grow">
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm w-full max-w-md p-6 rounded-lg">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                <LogIn className="h-8 w-8 text-emerald-600 dark:text-emerald-400" /> {/* Usando o ícone LogIn */}
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-slate-900 dark:text-white">
              Esqueceu sua senha?
            </CardTitle>
            <p className="text-center text-slate-600 dark:text-slate-300">Informe seu e-mail para redefinir sua senha</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">
                  Endereço de E-mail
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu e-mail"
                  className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  required
                />
              </div>

              <div className="flex items-center space-x-2 justify-between">
                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Redefinindo..." : "Redefinir Senha"}
                </Button>
              </div>

              {message && <p className="text-center mt-4 text-sm text-gray-600">{message}</p>}
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}