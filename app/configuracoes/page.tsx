import { SimpleHeader } from "@/components/layout/simple-header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Building, Calendar, KeyRound, UserPlus, Stethoscope, Clock, Settings } from "lucide-react"

export default function Configuracoes() {
  const configItems = [
    {
      title: "Cadastro de Profissionais",
      description: "Gerencie profissionais de saúde",
      icon: UserPlus,
      href: "/cadastro-profissionais",
      color: "bg-blue-500",
    },
    {
      title: "Cadastro de Especialidades",
      description: "Configure especialidades médicas",
      icon: Stethoscope,
      href: "/cadastro-especialidades",
      color: "bg-purple-500",
    },
    {
      title: "Cadastro de Unidades",
      description: "Gerencie unidades de saúde",
      icon: Building,
      href: "/cadastro-unidades",
      color: "bg-orange-500",
    },
    {
      title: "Cadastro de Calendário",
      description: "Configure calendários de disponibilidade",
      icon: Calendar,
      href: "/calendario",
      color: "bg-emerald-500",
    },
    {
      title: "Cadastro de Horários",
      description: "Gerencie horários disponíveis",
      icon: Clock,
      href: "/cadastro-horarios",
      color: "bg-cyan-500",
    },
    {
      title: "Alterar Senha",
      description: "Altere sua senha de acesso",
      icon: KeyRound,
      href: "/trocar-senha",
      color: "bg-red-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-900">
      <SimpleHeader title="Configurações do Sistema" showBackButton backUrl="/atendente" />

      <main className="container mx-auto px-4 py-8">
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-slate-900 dark:text-white flex items-center justify-center gap-2">
              <Settings className="h-6 w-6 text-emerald-600" />
              Configurações do Sistema
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Selecione uma opção para continuar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {configItems.map((item, index) => (
                <Card
                  key={index}
                  className="border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 group"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className={`p-4 ${item.color} rounded-full`}>
                        <item.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{item.description}</p>
                      </div>
                      <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                        <Link href={item.href}>Acessar</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
