"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MessageSquare, Send } from "lucide-react"
import { SimpleHeader } from "@/components/layout/simple-header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function FaleConosco() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Mensagem enviada",
        description: "Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.",
      })

      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-900 flex flex-col">
      <SimpleHeader title="Fale Conosco" showBackButton backUrl="/dashboard" />

      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <Card className="w-full max-w-xl sm:max-w-2xl shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <MessageSquare className="h-6 w-6" />
              Fale Conosco
            </CardTitle>
            <CardDescription className="text-slate-700 dark:text-slate-300">
              Envie sua mensagem, dúvida ou sugestão
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Informe seu e-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu e-mail"
                  className="text-slate-700 dark:text-slate-300"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mensagem">Nos diga como podemos te ajudar</Label>
                <Textarea
                  id="mensagem"
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Digite sua mensagem"
                  className="text-slate-700 dark:text-slate-300"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" disabled={loading}>
                <Send className="mr-2 h-4 w-4" />
                {loading ? "Enviando..." : "Enviar"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
