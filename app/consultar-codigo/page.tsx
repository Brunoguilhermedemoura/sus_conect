"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ExternalLink, QrCode } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SimpleHeader } from "@/components/layout/simple-header"

export default function ConsultarCodigo() {
  const router = useRouter()
  const [rg, setRg] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulando uma requisição ao servidor
    setTimeout(() => {
      setLoading(false)
      router.push("/finalizacao-consulta")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-900">
      <SimpleHeader title="Sistema de Agendamento" showBackButton backUrl="/dashboard" />
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <QrCode className="h-6 w-6" />
              Código Pronto Socorro
            </CardTitle>
            <CardDescription className="text-slate-700 dark:text-slate-300 text-center">
              Consulte o código de atendimento do pronto socorro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="rg">Insira o número do RG do cadastro do pronto socorro</Label>
                <Input
                  id="rg"
                  value={rg}
                  onChange={(e) => setRg(e.target.value)}
                  placeholder="Digite o RG"
                  className="text-slate-700 dark:text-slate-300text-slate-700 dark:text-slate-300"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" disabled={loading}>
                {loading ? "Consultando..." : "Consultar"}
              </Button>
            </form>
          </CardContent>
        </Card>

        
      </main>
      <Footer />
    </div>
  )
}
