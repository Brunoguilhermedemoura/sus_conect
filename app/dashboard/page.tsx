"use client"

import { Input } from "@/components/ui/input"
import { useState } from "react"
import { MainHeader } from "@/components/layout/main-header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Calendar,
  Clock,
  FileText,
  Activity,
  Pill,
  Syringe,
  Plus,
  ChevronRight,
  Bell,
  MapPin,
  Search,
  User,
  ClipboardList,
  UserCheck,
  Settings,
} from "lucide-react"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("visao-geral")
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <MainHeader userName="Maria Silva" userInitials="MS" />

      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        {/* Header with notifications */}
        {notifications > 0 && (
          <div className="mb-6 text-right">
            <Badge variant="destructive" className="text-sm">
              {notifications} notificações
            </Badge>
          </div>
        )}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Olá, Maria!</h1>
            <p className="text-gray-600 dark:text-gray-400">Bem-vinda ao seu painel de saúde</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/perfil">
                <User className="mr-2 h-4 w-4" />
                Meu Perfil
              </Link>
            </Button>
            <Button asChild>
              <Link href="/agendamento">
                <Plus className="mr-2 h-4 w-4" />
                Nova Consulta
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="visao-geral" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 md:w-[500px]">
            <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
            <TabsTrigger value="consultas">Consultas</TabsTrigger>
            <TabsTrigger value="exames">Exames</TabsTrigger>
            <TabsTrigger value="servicos">Serviços</TabsTrigger>
          </TabsList>

          <TabsContent value="visao-geral" className="space-y-6">
            {/* Resumo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-primary" />
                    Próxima Consulta
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {true ? (
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">Cardiologia</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Dr. Carlos Mendes</p>
                        </div>
                        <Badge>Confirmada</Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>15 de Junho, 2024 - 14:30</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>UBS Central</span>
                      </div>
                      <Button asChild variant="outline" className="w-full mt-4">
                        <Link href="/consultas">
                          Ver detalhes
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-500 dark:text-gray-400 mb-4">Nenhuma consulta agendada</p>
                      <Button asChild size="sm">
                        <Link href="/agendamento">Agendar consulta</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-primary" />
                    Exames Recentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Hemograma Completo</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">10/05/2024</p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-900/50"
                      >
                        Disponível
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Glicemia em Jejum</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">10/05/2024</p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-900/50"
                      >
                        Disponível
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Eletrocardiograma</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">02/05/2024</p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900/50"
                      >
                        Em análise
                      </Badge>
                    </div>
                  </div>
                  <Button asChild variant="outline" className="w-full mt-4">
                    <Link href="/exames">
                      Ver todos
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Bell className="mr-2 h-5 w-5 text-primary" />
                    Notificações
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium">Lembrete de Consulta</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Sua consulta com Dr. Carlos está marcada para amanhã às 14:30
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                        <FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium">Exames Disponíveis</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Seus resultados de exames já estão disponíveis
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center flex-shrink-0">
                        <Pill className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div>
                        <p className="font-medium">Medicamento</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Lembrete para tomar seu medicamento às 20:00
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button asChild variant="outline" className="w-full mt-4">
                    <Link href="/notificacoes">
                      Ver todas
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Acesso Rápido */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Acesso Rápido</CardTitle>
                <CardDescription>Serviços mais utilizados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    asChild
                    variant="outline"
                    className="h-auto py-6 flex flex-col items-center justify-center gap-2"
                  >
                    <Link href="/agendamento">
                      <Calendar className="h-6 w-6 text-primary mb-2" />
                      <span>Agendar Consulta</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-auto py-6 flex flex-col items-center justify-center gap-2"
                  >
                    <Link href="/exames">
                      <FileText className="h-6 w-6 text-primary mb-2" />
                      <span>Meus Exames</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-auto py-6 flex flex-col items-center justify-center gap-2"
                  >
                    <Link href="/medicamentos">
                      <Pill className="h-6 w-6 text-primary mb-2" />
                      <span>Medicamentos</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-auto py-6 flex flex-col items-center justify-center gap-2"
                  >
                    <Link href="/vacinas">
                      <Syringe className="h-6 w-6 text-primary mb-2" />
                      <span>Vacinas</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Indicadores de Saúde */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Indicadores de Saúde</CardTitle>
                <CardDescription>Acompanhe seus dados de saúde</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Pressão Arterial</h3>
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-3xl font-bold">120/80</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Última medição: 10/05/2024</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Glicemia</h3>
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-3xl font-bold">95 mg/dL</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Última medição: 10/05/2024</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">IMC</h3>
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-3xl font-bold">24.5</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Peso saudável</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consultas" className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Minhas Consultas</CardTitle>
                  <Button asChild size="sm">
                    <Link href="/agendamento">
                      <Plus className="mr-2 h-4 w-4" />
                      Nova Consulta
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Cardiologia</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Dr. Carlos Mendes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge>Confirmada</Badge>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">15/06/2024 - 14:30</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Oftalmologia</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Dra. Ana Soares</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">Agendada</Badge>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">22/07/2024 - 10:00</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Clínico Geral</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Dr. Roberto Almeida</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">Concluída</Badge>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">05/05/2024 - 09:15</p>
                    </div>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full mt-6">
                  <Link href="/consultas">
                    Ver histórico completo
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exames" className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Meus Exames</CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input placeholder="Buscar exames..." className="pl-9" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                    <div>
                      <h3 className="font-medium">Hemograma Completo</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Laboratório Central</p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-900/50"
                      >
                        Disponível
                      </Badge>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">10/05/2024</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                    <div>
                      <h3 className="font-medium">Glicemia em Jejum</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Laboratório Central</p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-900/50"
                      >
                        Disponível
                      </Badge>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">10/05/2024</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                    <div>
                      <h3 className="font-medium">Eletrocardiograma</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Hospital São Lucas</p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900/50"
                      >
                        Em análise
                      </Badge>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">02/05/2024</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                    <div>
                      <h3 className="font-medium">Raio-X de Tórax</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Hospital São Lucas</p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-900/50"
                      >
                        Disponível
                      </Badge>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">15/04/2024</p>
                    </div>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full mt-6">
                  <Link href="/exames">
                    Ver todos os exames
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other TabsContent components would go here */}
          
          <TabsContent value="servicos">
            {/* Menu Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Serviços do SUS</h2>
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
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
