"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { MainHeader } from "@/components/layout/main-header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, Clock, MapPin, Search, ArrowRight, CheckCircle, Shield, Activity } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const scrollParam = searchParams.get("scroll")

    // Verificar se há o parâmetro de rolagem
    if (scrollParam) {
      setTimeout(() => {
        if (scrollParam === "servicos") {
          document.getElementById("servicos-rapidos")?.scrollIntoView({ behavior: "smooth" })
        }
        if (scrollParam === "contato") {
          document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })
        }
      }, 300)
    }

    // Sempre rolar para o topo quando a página for recarregada
    window.scrollTo({ top: 0, behavior: "smooth" })
    
    // Remover o parâmetro 'scroll' da URL após a rolagem
    window.history.replaceState(null, "", window.location.pathname)

  }, [searchParams])

  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 clip-path-slant">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <Badge
                variant="outline"
                className="px-4 py-1 border-primary text-primary bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
              >
                Sistema Único de Saúde
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
                Cuidando da sua saúde com <span className="text-primary">simplicidade</span>
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl">
                Acesse todos os serviços do SUS em um só lugar. Agende consultas, acompanhe exames e gerencie sua saúde
                de forma prática e eficiente.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/login">Acessar Conta</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <Link href="/cadastro">Criar Conta</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-green-300 to-emerald-300 dark:from-green-800 dark:to-emerald-800 opacity-30 blur-xl"></div>
              <div className="relative gradient-border shadow-colored animate-float">
                <img
                  src="/hero-image.png"
                  alt="Profissionais de saúde atendendo paciente"
                  className="rounded-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços Rápidos */}
      <section id="servicos-rapidos" className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Serviços Rápidos</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Acesse os serviços mais utilizados do SUS de forma rápida e prática
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="h-2 bg-primary w-full"></div>
              <CardContent className="p-6">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Calendar className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Agendar Consulta</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Marque consultas com especialistas de forma rápida e escolha a unidade mais próxima de você.
                </p>
                <Button asChild variant="outline" className="w-full group">
                  <Link href="/login">
                    Agendar agora
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="h-2 bg-primary w-full"></div>
              <CardContent className="p-6">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Search className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Consultar Exames</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Acesse seus resultados de exames e acompanhe seu histórico médico com facilidade.
                </p>
                <Button asChild variant="outline" className="w-full group">
                  <Link href="/login">
                    Consultar exames
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="h-2 bg-primary w-full"></div>
              <CardContent className="p-6">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <MapPin className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Encontrar Unidades</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Localize unidades de saúde próximas a você e veja informações sobre serviços disponíveis.
                </p>
                <Button asChild variant="outline" className="w-full group">
                  <Link href="/unidades">
                    Encontrar unidades
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Por que usar o SUS Connect?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Nossa plataforma foi desenvolvida para facilitar seu acesso aos serviços de saúde pública
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Economia de Tempo</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Agende consultas e exames sem sair de casa, evitando filas e deslocamentos desnecessários.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Facilidade de Acesso</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Acesse todos os serviços do SUS em um só lugar, de forma simples e intuitiva.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Segurança de Dados</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Seus dados médicos são protegidos com os mais altos padrões de segurança e privacidade.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Acompanhamento Contínuo</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Acompanhe seu histórico médico e receba lembretes de consultas e medicamentos.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Localização Inteligente</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Encontre unidades de saúde próximas a você e veja informações sobre serviços disponíveis.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Gestão de Agendamentos</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Gerencie suas consultas e exames, com opções de remarcação e cancelamento quando necessário.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Comece a cuidar da sua saúde agora mesmo</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Acesse todos os serviços do SUS de forma rápida, prática e segura.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
            asChild size="lg" 
            className="rounded-full bg-white text-primary hover:bg-gray-100">
              <Link href="/login">Acessar Conta</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white text-primary hover:bg-gray-100">
              <Link href="/cadastro">Criar Conta</Link>
            </Button>
          </div>
        </div>
      </section>

            {/* Contato */}
      <div id="contato">
        <Footer />
      </div>
    </div>
  )
}
