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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 to-blue-700">
      <Header showBackButton backUrl="/menu" />
      <main className="flex-1 container mx-auto p-4 grid md:grid-cols-3 gap-6">
        <Card className="bg-white/10 text-white border-none shadow-xl md:col-span-2">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <QrCode className="h-6 w-6" />
              Código Pronto Socorro
            </CardTitle>
            <CardDescription className="text-gray-200">
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
                  className="bg-white/20 border-white/10 text-white placeholder:text-gray-300"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                {loading ? "Consultando..." : "Consultar"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-white/10 text-white border-none shadow-xl h-fit">
          <CardHeader>
            <CardTitle className="text-xl">Informações Úteis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link
              href="http://portalsaude.saude.gov.br"
              target="_blank"
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <span>Portal Saúde</span>
              <ExternalLink className="h-4 w-4" />
            </Link>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span>Disque Saúde: 136</span>
            </div>

            <Link
              href="https://portaldocidadao.saude.gov.br"
              target="_blank"
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <span>Portal de Saúde do Cidadão</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
