"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SimpleHeader } from "@/components/layout/simple-header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Send, ClipboardList } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function Triagem() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 7
  const progress = (currentStep / totalSteps) * 100

  const [formData, setFormData] = useState({
    rg: "",
    genero_id: "",
    gravida_id: "",
    meses_id: "0",
    semanas_id: "0",
    peso_id: "",
    fumante_id: "",
    diabetes_id: "",
    problemas_rins_id: "",
    doencas_cardiacas_id: "",
    avc_id: "",
    infarto_id: "",
    hipertensao_id: "",
    doenca_respiratoria_id: "",
    cancer_id: "",
    tuberculose_id: "",
    uso_drogas_id: "",
    hanseniase_id: "",
    acamado_id: "",
    domiciliado_id: "",
    plantas_medicinais_id: "",
    internacao_id: "",
    saude_mental_id: "",
    praticas_complementares_id: "",
    outras_condicoes: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    toast({
      title: "Formulário enviado com sucesso!",
      description: "Seus dados de triagem foram registrados.",
    })

    setTimeout(() => {
      router.push("/dashboard")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-900">
      <SimpleHeader title="Formulário de Triagem"  showBackButton backUrl="/dashboard" />

      <main className="container mx-auto px-4 py-8">
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-slate-900 dark:text-white flex items-center justify-center gap-2">
              <ClipboardList className="h-6 w-6 text-emerald-600" />
              Formulário de Triagem
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Etapa {currentStep} de {totalSteps}
            </CardDescription>
            <div className="mt-4">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{Math.round(progress)}% concluído</p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Etapa 1: Informações Básicas */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="rg" className="text-slate-700 dark:text-slate-300">
                      RG:
                    </Label>
                    <Input
                      id="rg"
                      value={formData.rg}
                      onChange={(e) => handleChange("rg", e.target.value)}
                      placeholder="Digite o RG"
                      className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="genero_id" className="text-slate-700 dark:text-slate-300">
                      Gênero:
                    </Label>
                    <Select
                      value={formData.genero_id}
                      onValueChange={(value) => handleChange("genero_id", value)}
                      required
                    >
                      <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <SelectValue placeholder="Selecione o gênero" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Feminino</SelectItem>
                        <SelectItem value="2">Masculino</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.genero_id === "1" && (
                    <div className="space-y-2">
                      <Label htmlFor="gravida_id" className="text-slate-700 dark:text-slate-300">
                        Está grávida?
                      </Label>
                      <Select value={formData.gravida_id} onValueChange={(value) => handleChange("gravida_id", value)}>
                        <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                          <SelectValue placeholder="Selecione uma opção" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Sim</SelectItem>
                          <SelectItem value="2">Não</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {formData.genero_id === "1" && formData.gravida_id === "1" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="meses_id" className="text-slate-700 dark:text-slate-300">
                          Meses de Gravidez:
                        </Label>
                        <Select value={formData.meses_id} onValueChange={(value) => handleChange("meses_id", value)}>
                          <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                            <SelectValue placeholder="Selecione os meses" />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(10)].map((_, i) => (
                              <SelectItem key={i} value={i.toString()}>
                                {i} {i === 1 ? "Mês" : "Meses"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="semanas_id" className="text-slate-700 dark:text-slate-300">
                          Semanas de Gravidez:
                        </Label>
                        <Select
                          value={formData.semanas_id}
                          onValueChange={(value) => handleChange("semanas_id", value)}
                        >
                          <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                            <SelectValue placeholder="Selecione as semanas" />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(10)].map((_, i) => (
                              <SelectItem key={i} value={i.toString()}>
                                {i} {i === 1 ? "Semana" : "Semanas"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Etapa 2: Condições de Saúde Básicas */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="peso_id" className="text-slate-700 dark:text-slate-300">
                      Peso:
                    </Label>
                    <Select value={formData.peso_id} onValueChange={(value) => handleChange("peso_id", value)} required>
                      <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <SelectValue placeholder="Selecione o peso" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Acima do Peso</SelectItem>
                        <SelectItem value="2">Peso Adequado</SelectItem>
                        <SelectItem value="3">Abaixo do Peso</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fumante_id" className="text-slate-700 dark:text-slate-300">
                      Fumante:
                    </Label>
                    <Select
                      value={formData.fumante_id}
                      onValueChange={(value) => handleChange("fumante_id", value)}
                      required
                    >
                      <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Sim</SelectItem>
                        <SelectItem value="2">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="diabetes_id" className="text-slate-700 dark:text-slate-300">
                      Diabetes:
                    </Label>
                    <Select
                      value={formData.diabetes_id}
                      onValueChange={(value) => handleChange("diabetes_id", value)}
                      required
                    >
                      <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Sim</SelectItem>
                        <SelectItem value="2">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="problemas_rins_id" className="text-slate-700 dark:text-slate-300">
                      Problemas nos Rins:
                    </Label>
                    <Select
                      value={formData.problemas_rins_id}
                      onValueChange={(value) => handleChange("problemas_rins_id", value)}
                      required
                    >
                      <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Sim</SelectItem>
                        <SelectItem value="2">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doencas_cardiacas_id" className="text-slate-700 dark:text-slate-300">
                      Doenças Cardíacas:
                    </Label>
                    <Select
                      value={formData.doencas_cardiacas_id}
                      onValueChange={(value) => handleChange("doencas_cardiacas_id", value)}
                      required
                    >
                      <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Sim</SelectItem>
                        <SelectItem value="2">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Etapa 3: Condições Cardiovasculares e Respiratórias */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="avc_id" className="text-slate-700 dark:text-slate-300">
                      AVC:
                    </Label>
                    <Select value={formData.avc_id} onValueChange={(value) => handleChange("avc_id", value)} required>
                      <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Sim</SelectItem>
                        <SelectItem value="2">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="infarto_id" className="text-slate-700 dark:text-slate-300">
                      Infarto:
                    </Label>
                    <Select
                      value={formData.infarto_id}
                      onValueChange={(value) => handleChange("infarto_id", value)}
                      required
                    >
                      <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Sim</SelectItem>
                        <SelectItem value="2">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hipertensao_id" className="text-slate-700 dark:text-slate-300">
                      Hipertensão:
                    </Label>
                    <Select
                      value={formData.hipertensao_id}
                      onValueChange={(value) => handleChange("hipertensao_id", value)}
                      required
                    >
                      <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Sim</SelectItem>
                        <SelectItem value="2">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doenca_respiratoria_id" className="text-slate-700 dark:text-slate-300">
                      Doença Respiratória:
                    </Label>
                    <Select
                      value={formData.doenca_respiratoria_id}
                      onValueChange={(value) => handleChange("doenca_respiratoria_id", value)}
                      required
                    >
                      <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Sim</SelectItem>
                        <SelectItem value="2">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Etapa 4: Outras Condições Médicas */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cancer_id" className="text-slate-700 dark:text-slate-300">
                      Câncer:
                    </Label>
                    <Select
                      value={formData.cancer_id}
                      onValueChange={(value) => handleChange("cancer_id", value)}
                      required
                    >
                      <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Sim</SelectItem>
                        <SelectItem value="2">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tuberculose_id" className="text-slate-700 dark:text-slate-300">
                      Tuberculose:
                    </Label>
                    <Select
                      value={formData.tuberculose_id}
                      onValueChange={(value) => handleChange("tuberculose_id", value)}
                      required
                    >
                      <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Sim</SelectItem>
                        <SelectItem value="2">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="uso_drogas_id" className="text-slate-700 dark:text-slate-300">
                      Uso de Drogas:
                    </Label>
                    <Select
                      value={formData.uso_drogas_id}
                      onValueChange={(value) => handleChange("uso_drogas_id", value)}
                      required
                    >
                      <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Sim</SelectItem>
                        <SelectItem value="2">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hanseniase_id" className="text-slate-700 dark:text-slate-300">
                      Hanseníase:
                    </Label>
                    <Select
                      value={formData.hanseniase_id}
                      onValueChange={(value) => handleChange("hanseniase_id", value)}
                      required
                    >
                      <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Sim</SelectItem>
                        <SelectItem value="2">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Etapa 5: Condições de Mobilidade e Tratamentos Alternativos */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="acamado_id" className="text-slate-700 dark:text-slate-300">
                      Acamado:
                    </Label>
                    <Select
                      value={formData.acamado_id}
                      onValueChange={(value) => handleChange("acamado_id", value)}
                      required
                    >
                      <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Sim</SelectItem>
                        <SelectItem value="2">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="domiciliado_id" className="text-slate-700 dark:text-slate-300">
                      Domiciliado:
                    </Label>
                    <Select
                      value={formData.domiciliado_id}
                      onValueChange={(value) => handleChange("domiciliado_id", value)}
                      required
                    >
                      <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Sim</SelectItem>
                        <SelectItem value="2">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="plantas_medicinais_id" className="text-slate-700 dark:text-slate-300">
                      Uso de Plantas Medicinais:
                    </Label>
                    <Select
                      value={formData.plantas_medicinais_id}
                      onValueChange={(value) => handleChange("plantas_medicinais_id", value)}
                      required
                    >
                      <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Sim</SelectItem>
                        <SelectItem value="2">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Etapa 6: Histórico Médico e Saúde Mental */}
              {currentStep === 6 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="internacao_id" className="text-slate-700 dark:text-slate-300">
                      Internação Recente:
                    </Label>
                    <Select
                      value={formData.internacao_id}
                      onValueChange={(value) => handleChange("internacao_id", value)}
                      required
                    >
                      <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Sim</SelectItem>
                        <SelectItem value="2">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="saude_mental_id" className="text-slate-700 dark:text-slate-300">
                      Problemas de Saúde Mental:
                    </Label>
                    <Select
                      value={formData.saude_mental_id}
                      onValueChange={(value) => handleChange("saude_mental_id", value)}
                      required
                    >
                      <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Sim</SelectItem>
                        <SelectItem value="2">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="praticas_complementares_id" className="text-slate-700 dark:text-slate-300">
                      Práticas Complementares:
                    </Label>
                    <Select
                      value={formData.praticas_complementares_id}
                      onValueChange={(value) => handleChange("praticas_complementares_id", value)}
                      required
                    >
                      <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Sim</SelectItem>
                        <SelectItem value="2">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Etapa 7: Outras Condições */}
              {currentStep === 7 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="outras_condicoes" className="text-slate-700 dark:text-slate-300">
                      Outras Condições:
                    </Label>
                    <Textarea
                      id="outras_condicoes"
                      value={formData.outras_condicoes}
                      onChange={(e) => handleChange("outras_condicoes", e.target.value)}
                      placeholder="Descreva outras condições de saúde relevantes"
                      className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 min-h-[120px]"
                    />
                  </div>
                </div>
              )}

              {/* Botões de navegação */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-slate-200 dark:border-slate-700"
                    onClick={previousStep}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Voltar
                  </Button>
                )}

                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={nextStep}
                  >
                    Avançar
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Send className="mr-2 h-4 w-4" />
                    Enviar
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
