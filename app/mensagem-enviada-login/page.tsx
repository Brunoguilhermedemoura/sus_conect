import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function MensagemEnviadaLogin() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 to-blue-700">
      <Header />
      <main className="flex-1 container mx-auto p-4 grid md:grid-cols-3 gap-6">
        <Card className="bg-white/10 text-white border-none shadow-xl md:col-span-2">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-400" />
              Mensagem Enviada Com Sucesso!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-white/5 p-6 rounded-lg space-y-4">
              <p>Sua mensagem foi enviada com sucesso.</p>
              <p>
                Entraremos em contato, via e-mail, assim que sua mensagem for analisada. Caso seja necessário, após a
                mensagem via e-mail, agendaremos um contato telefônico.
              </p>
              <p>
                Agradecemos a sua contribuição, contamos com o sua opinião para melhorar cada vez mais os atendimentos
                realizados pelo Sistema Único de Saúde.
              </p>
            </div>

            <div className="flex justify-center pt-4">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/login">Voltar para a Página de Login</Link>
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
