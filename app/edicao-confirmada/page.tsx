import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle, ExternalLink } from "lucide-react"

export default function EdicaoConfirmada() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 to-blue-700">
      <Header showBackButton backUrl="/menu" />
      <main className="flex-1 container mx-auto p-4 grid md:grid-cols-3 gap-6">
        <Card className="bg-white/10 text-white border-none shadow-xl md:col-span-2">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-400" />
            </div>
            <CardTitle className="text-2xl">Dados Atualizados com Sucesso!</CardTitle>
            <CardDescription className="text-gray-200">Suas informações foram atualizadas no sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center text-white">
              <p className="mb-2">Por favor, acesse o seu e-mail para confirmar as alterações.</p>
              <p className="text-sm text-gray-300">
                Pode demorar alguns minutos até que você receba o e-mail de confirmação.
              </p>
            </div>

            <Button asChild className="w-full bg-green-600 hover:bg-green-700">
              <Link href="/menu">Voltar para o Menu</Link>
            </Button>
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
              <ExternalLink className="h-4 w-4" />
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
              <ExternalLink className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
