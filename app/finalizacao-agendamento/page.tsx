import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarCheck, CheckCircle, MapPin, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function FinalizacaoAgendamento() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 to-blue-700">
      <Header showBackButton backUrl="/menu" />
      <main className="flex-1 container mx-auto p-4 grid md:grid-cols-3 gap-6">
        <Card className="bg-white/10 text-white border-none shadow-xl md:col-span-2">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-400" />
              Agendamento Confirmado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-white/5 p-4 rounded-lg">
              <p className="mb-4">
                Segue resumo das informações, no dia da consulta apresente o RG ou o código de atendimento abaixo.
              </p>
              <div className="flex flex-col gap-3 bg-white/10 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 mt-1 text-blue-300 flex-shrink-0" />
                  <div>
                    <p>
                      <strong>Nome:</strong> Bruno G. de Moura
                    </p>
                    <p>
                      <strong>RG:</strong> 12.345.678-1
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CalendarCheck className="h-5 w-5 mt-1 text-blue-300 flex-shrink-0" />
                  <div>
                    <p>
                      <strong>Cardiologista</strong>
                    </p>
                    <p>05/10/2024 às 14h30m</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-1 text-blue-300 flex-shrink-0" />
                  <div>
                    <p>
                      <strong>Unidade:</strong> Nome da Unidade
                    </p>
                    <p>R. Martin Girardi, 1022 - Parque das Palmeiras</p>
                    <p>Chapecó - SC CEP: 12345-000</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-lg text-center">
              <p className="text-sm mb-2">Seu código de atendimento é:</p>
              <p className="text-3xl font-bold text-blue-300 my-2">DZX56789</p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-300" />
                Localização da Unidade
              </h2>
              <div className="bg-white/5 p-2 rounded-lg">
                <Image
                  src="/placeholder.svg?height=200&width=600&query=map with healthcare unit location"
                  alt="Mapa com localização da unidade"
                  width={600}
                  height={200}
                  className="w-full rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/menu">Voltar ao Menu</Link>
              </Button>
            </div>
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
            </Link>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
