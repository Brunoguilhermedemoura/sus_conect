"use client"

import { useState } from "react"
import { MainHeader } from "@/components/layout/main-header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Calendar,
  FileText,
  Settings,
  ClipboardList,
  Search,
  UserCheck,
  Clock,
  Heart,
  Activity,
  Bell,
  ChevronRight,
} from "lucide-react"

export default function Menu() {
  const [notifications] = useState(3)

  const menuItems = [
    {
      title: "Agendamentos",
      description: "Agende suas consultas médicas",
      icon: Calendar,
      href: "/agendamentos",
      color: "bg-emerald-500",
      badge: "2 pendentes",
    },
    {
      title: "Triagem",
      description: "Preencha o formulário de triagem",
      icon: ClipboardList,
      href: "/triagem",
      color: "bg-blue-500",
    },
    {
      title: "Consultar Código",
      description: "Consulte códigos de atendimento",
      icon: Search,
      href: "/consultar-codigo",
      color: "bg-purple-500",
    },
    {
      title: "Lista de Ocorrências",
      description: "Visualize suas ocorrências médicas",
      icon: FileText,
      href: "/lista-ocorrencias",
      color: "bg-orange-500",
    },
    {
      title: "Dados Pessoais",
      description: "Gerencie suas informações",
      icon: UserCheck,
      href: "/dados-pessoais",
      color: "bg-pink-500",
    },
    {
      title: "Fale Conosco",
      description: "Entre em contato conosco",
      icon: Bell,
      href: "/fale-conosco",
      color: "bg-cyan-500",
    },
  ]

  const adminItems = [
    {
      title: "Validação de Atendimento",
      description: "Validar atendimentos de pacientes",
      icon: UserCheck,
      href: "/atendimento",
      color: "bg-red-500",
    },
    {
      title: "Confirmação de Atendimento",
      description: "Confirmar presença de pacientes",
      icon: Clock,
      href: "/confirmacao-atendimento",
      color: "bg-yellow-500",
    },
    {
      title: "Configurações",
      description: "Configurações do sistema",
      icon: Settings,
      href: "/configuracoes",
      color: "bg-gray-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-900">
      <MainHeader />

      <main className="container mx-auto px-4 pt-24 pb-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Bem-vindo ao SUS Digital</h1>
              <p className="text-slate-600 dark:text-slate-300">Acesse todos os serviços de saúde em um só lugar</p>
            </div>
            {notifications > 0 && (
              <Badge variant="destructive" className="text-sm">
                {notifications} notificações
              </Badge>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-full">
                  <Heart className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Próxima Consulta</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">15/05/2024</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Exames Pendentes</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">2</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                  <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Receitas Ativas</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Menu */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Serviços Principais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group"
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

        {/* Admin Section 
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Área Administrativa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminItems.map((item, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 ${item.color} rounded-full`}>
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{item.description}</p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-900"
                  >
                    <Link href={item.href} className="flex items-center justify-center">
                      Acessar
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>*/}
      </main>

      <Footer />
    </div>
  )
}
