import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle, ExternalLink } from "lucide-react"
import { SimpleHeader } from "@/components/layout/simple-header"

export default function EdicaoConfirmada() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-900">
      <SimpleHeader title="Sistema de Agendamento" showBackButton backUrl="/login" /> 
      <main className="container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="text-2xl flex items-center justify-center gap-2">
              <CheckCircle className="h-16 w-16 text-green-400" />
            </div>
            <CardTitle className="text-slate-700 dark:text-slate-300 text-center">Dados Atualizados com Sucesso!</CardTitle>
            <CardDescription className="text-slate-700 dark:text-slate-300 text-center">Suas informações foram atualizadas no sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-slate-700 dark:text-slate-300 text-center">
              <p className="mb-2">Por favor, acesse o seu e-mail para confirmar as alterações.</p>
              <p className="text-slate-700 dark:text-slate-300text-slate-700 dark:text-slate-300">
                Pode demorar alguns minutos até que você receba o e-mail de confirmação.
              </p>
            </div>

            <Button asChild className="w-full bg-green-600 hover:bg-green-700">
              <Link href="/menu">Voltar para o Menu</Link>
            </Button>
          </CardContent>
        </Card> 
      </main>
      <Footer />
    </div>
  )
}
