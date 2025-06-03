import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, User, QrCode, Download, Printer, Share2 } from "lucide-react"
import Link from "next/link"

export default function FinalizacaoConsulta() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <Header showBackButton backUrl="/menu" />

      <main className="flex-1 container mx-auto p-4">
        <div className="grid md:grid-cols-3 gap-6 animate-fade-in">
          <Card className="glass-card shadow-xl md:col-span-2 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
            <CardHeader className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                <QrCode className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-center">Atendimento Cadastrado</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-950/50 p-4 rounded-lg border border-blue-100 dark:border-blue-900">
                <p className="text-center mb-4">Apresente estas informações em qualquer unidade do SUS</p>

                <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                    <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Nome</p>
                        <p className="font-medium">João Mateus Costa</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">RG</p>
                        <p className="font-medium">46.245.567-1</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <p className="text-gray-500 dark:text-gray-400 mb-2">Seu código de atendimento é:</p>
                <div className="bg-blue-600 text-white dark:bg-blue-800 px-6 py-3 rounded-lg text-2xl font-bold tracking-wider animate-pulse-slow">
                  DZX56789
                </div>
              </div>

              <div className="flex justify-center">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <img src="/qr-code.png" alt="QR Code" className="h-48 w-48" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                  Unidades próximas a você
                </h3>
                <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
                  <img src="/healthcare-map.png" alt="Mapa com unidades próximas" className="w-full h-auto" />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                <Button variant="outline" className="hover-lift focus-ring">
                  <Download className="h-4 w-4 mr-2" />
                  Baixar Comprovante
                </Button>
                <Button variant="outline" className="hover-lift focus-ring">
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimir
                </Button>
                <Button variant="outline" className="hover-lift focus-ring">
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card shadow-xl h-fit">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Próximos Passos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Guarde seu código</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Anote ou salve o código de atendimento para apresentar na unidade.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">Dirija-se à unidade</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Escolha uma das unidades próximas e apresente-se na recepção.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Documentos necessários</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Leve seu RG e cartão do SUS para o atendimento.
                    </p>
                  </div>
                </div>
              </div>

              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 mt-4 hover-lift focus-ring">
                <Link href="/menu">Voltar ao Menu</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
