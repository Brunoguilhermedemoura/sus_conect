"use client"

import { MainHeader } from "@/components/layout/main-header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  UserCheck,
  ClipboardCheck,
  Calendar,
  Users,
  Activity,
  Clock,
  FileText,
  Settings,
  ChevronRight,
  Bell,
} from "lucide-react"

export default function IndexAtendente() {
  const atendimentosHoje = 0;
  const pendentes = 0;
  const confirmados = 0;

  const funcionalidades = [
    {
      title: "Validação de Atendimento",
      description: "Valide e confirme atendimentos de pacientes com códigos de triagem",
      icon: UserCheck,
      href: "/atendimento",
      color: "bg-emerald-500",
    },
    {
      title: "Confirmação de Atendimento",
      description: "Confirme a presença de pacientes e gerencie agendamentos do dia",
      icon: ClipboardCheck,
      href: "/confirmacao-atendimento",
      color: "bg-blue-500",
    },
    {
      title: "Consulta de Agendamentos",
      description: "Visualize e gerencie todos os agendamentos por especialidade e profissional",
      icon: Calendar,
      href: "/agendamentos",
      color: "bg-purple-500",
    },
    {
      title: "Gestão de Profissionais",
      description: "Cadastre e consulte profissionais de saúde",
      icon: Users,
      href: "/consulta-profissionais",
      color: "bg-orange-500",
    },
    {
      title: "Configurações sistema",
      description: "Configurar sistema",
      icon: Settings,
      href: "/configuracoes",
      color: "bg-gray-500",
    }
  ]

  const configuracoes = [
    {
      title: "Cadastro de Profissionais",
      description: "Cadastrar novos profissionais de saúde",
      icon: Users,
      href: "/cadastro-profissionais",
    },
    {
      title: "Cadastro de Especialidades",
      description: "Gerenciar especialidades médicas",
      icon: FileText,
      href: "/cadastro-especialidades",
    },
    {
      title: "Cadastro de Unidades",
      description: "Gerenciar unidades de saúde",
      icon: Settings,
      href: "/cadastro-unidades",
    },
    {
      title: "Cadastro de Horários",
      description: "Configurar horários de atendimento",
      icon: Clock,
      href: "/cadastro-horarios",
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-900">
      <MainHeader />

<<<<<<< HEAD
      <main className="container mx-auto px-4 py-8 pt-28 md:pt-32">
        {/* Header da página */}
=======
      <main className="container mx-auto px-4 py-8 mt-12">
        {/* Header Section */}
>>>>>>> 22884cb836af15cc9bd5e1386c48193050901020
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Portal do Atendente</h1>
              <p className="text-slate-600 dark:text-slate-300">Sistema de gestão para atendentes do SUS</p>
            </div>
<<<<<<< HEAD
            {/*<Badge variant="secondary" className="text-sm">
              <Bell className="h-4 w-4 mr-1" />
              {atendimentosHoje} atendimentos hoje
            </Badge>*/}
=======

            {/* Remover essa parte abaixo */}
            {/* <Badge variant="secondary" className="text-sm">
              <Bell className="h-4 w-4 mr-1" />
              {atendimentosHoje} atendimentos hoje
            </Badge> */}
>>>>>>> 22884cb836af15cc9bd5e1386c48193050901020
          </div>
        </div>

        {/* Indicadores rápidos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-full">
                  <Activity className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Atendimentos Hoje</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{atendimentosHoje}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                  <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Pendentes</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{pendentes}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <UserCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Confirmados</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{confirmados}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Funcionalidades principais */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Funcionalidades Principais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {funcionalidades.map((item, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 ${item.color} rounded-full`}>
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{item.description}</p>
                  <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Link href={item.href} className="flex items-center justify-center">
                      Acessar
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Configurações do sistema 
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Configurações do Sistema</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {configuracoes.map((item, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                      <item.icon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{item.description}</p>
                    </div>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full mt-3 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  >
                    <Link href={item.href} className="flex items-center justify-center">
                      Acessar
                      <ChevronRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>*/}

        {/* Acesso rápido 
        <div className="mt-8">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-500 to-blue-500 text-white">
            <CardHeader>
              <CardTitle className="text-xl">Acesso Rápido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="secondary" className="flex-1">
                  <Link href="/configuracoes">
                    <Settings className="mr-2 h-4 w-4" />
                    Todas as Configurações
                  </Link>
                </Button>
                <Button asChild variant="secondary" className="flex-1">
                  <Link href="/calendario">
                    <Calendar className="mr-2 h-4 w-4" />
                    Calendário Completo
                  </Link>
                </Button>
                <Button asChild variant="secondary" className="flex-1">
                  <Link href="/menu">
                    <Users className="mr-2 h-4 w-4" />
                    Menu Principal
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>*/}
      </main>

      <Footer />
    </div>
  )
}
