"use client"

import type React from "react"

import { useState } from "react"
import { SimpleHeader } from "@/components/layout/simple-header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Download, FileCheck, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function Atendimento() {
  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const [validado, setValidado] = useState<boolean>(false)
  const [dadosTriagem, setDadosTriagem] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setLoading(false)

      const dados = {
        Nome_Paciente: "Maria Silva",
        CPF: "123.456.789-00",
        Data_Nascimento: "15/05/1985",
        Pressao_Arterial: "120/80",
        Temperatura: "36.5°C",
        Saturacao: "98%",
        Frequencia_Cardiaca: "75 bpm",
        Sintomas: "Dor de cabeça, febre baixa",
        Medicacoes: "Paracetamol",
        Alergias: "Penicilina",
        Observacoes: "Paciente com histórico de hipertensão",
      }

      setDadosTriagem(dados)
      setValidado(true)

      toast({
        title: "Atendimento validado",
        description: "Os dados do paciente foram carregados com sucesso.",
        duration: 3000,
      })
    }, 2000)
  }

  const baixarPDF = () => {
    toast({
      title: "Download iniciado",
      description: "O PDF do relatório está sendo gerado e baixado.",
      duration: 3000,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-900">
      <SimpleHeader title="Validação de Atendimento" backUrl="/menu" />

      <main className="container mx-auto px-4 py-8">
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-slate-900 dark:text-white flex items-center justify-center gap-2">
              <FileCheck className="h-6 w-6 text-emerald-600" />
              Validação de Atendimento
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Insira os dados para validar o atendimento do paciente
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!validado ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="rg" className="text-slate-700 dark:text-slate-300">
                    RG do Paciente
                  </Label>
                  <Input
                    id="rg"
                    placeholder="Digite o RG do paciente"
                    required
                    className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="codigo" className="text-slate-700 dark:text-slate-300">
                    Código de Atendimento
                  </Label>
                  <Input
                    id="codigo"
                    placeholder="Digite o código de atendimento"
                    required
                    className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  disabled={loading}
                >
                  {loading ? "Validando..." : "Validar Atendimento"}
                </Button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle className="h-12 w-12 text-emerald-500" />
                </div>

                <Card className="border border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-slate-900 dark:text-white">Dados Validados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableBody>
                          {Object.entries(dadosTriagem).map(([chave, valor]) => (
                            <TableRow key={chave} className="border-b border-slate-200 dark:border-slate-700">
                              <TableCell className="font-medium text-slate-900 dark:text-white">
                                {chave.replace(/_/g, " ")}
                              </TableCell>
                              <TableCell className="text-slate-700 dark:text-slate-300">
                                {valor || "Não informado"}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={baixarPDF} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Baixar PDF
                  </Button>
                  <Button
                    onClick={() => setValidado(false)}
                    variant="outline"
                    className="flex-1 border-slate-200 dark:border-slate-700"
                  >
                    Validar Outro Atendimento
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
