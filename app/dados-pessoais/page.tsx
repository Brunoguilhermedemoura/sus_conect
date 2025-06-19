import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { UserPlus, UserCog, ArrowLeft, User } from "lucide-react"
import { SimpleHeader } from "@/components/layout/simple-header"

export default function DadosPessoais() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-900">
      <SimpleHeader title="Sistema de Agendamento " showBackButton backUrl="/dashboard" />
      
      <main className="container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <User className="h-6 w-6" />
              Dados Pessoais
            </CardTitle>
            <CardDescription className="text-slate-700 dark:text-slate-300 text-center">Gerencie suas informações pessoais</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full rounded-xl bg-green-600 hover:bg-green-700 text-white">
              <Link href="/cadastro" className="flex items-center justify-center gap-2">
                <UserPlus className="h-5 w-5" />
                <span>Criar Cadastro</span>
              </Link>
            </Button>
            <Button asChild className="w-full rounded-xl bg-green-600 hover:bg-green-700 text-white">
              <Link href="/editar-perfil" className="flex items-center justify-center gap-2">
                <UserCog className="h-5 w-5" />
                <span>Editar Cadastro</span>
              </Link>
            </Button>
            
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
