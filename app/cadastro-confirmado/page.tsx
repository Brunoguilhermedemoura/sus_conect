"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { SimpleHeader } from "@/components/layout/simple-header"

export default function CadastroConfirmado() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login")
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-900">
      <SimpleHeader title="Cadastro Confirmado" showBackButton backUrl="/login" />
      <main className="container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm w-full max-w-md text-center">
          <CardHeader className="space-y-3">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl text-slate-800 dark:text-white">
              Cadastro Realizado com Sucesso!
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-300">
              Seu cadastro foi concluído e está quase pronto.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>Acesse seu e-mail para confirmar o cadastro.</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Você será redirecionado automaticamente em instantes.
            </p>

            <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
              <Link href="/login">Voltar para Tela de Login</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
