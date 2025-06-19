"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, KeyRound } from "lucide-react"
import { SimpleHeader } from "@/components/layout/simple-header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

export default function TrocarSenha() {
  const router = useRouter()
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)
  const [showSenhaAtual, setShowSenhaAtual] = useState(false)
  const [showNovaSenha, setShowNovaSenha] = useState(false)
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false)

  const [formData, setFormData] = useState({
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
    lembrar: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const { senhaAtual, novaSenha, confirmarSenha } = formData

    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    if (novaSenha !== confirmarSenha) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    // Simula envio
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Senha alterada com sucesso",
        description: "Use sua nova senha no próximo login.",
      })
      router.push("/login")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-900">
      <SimpleHeader title="Sistema de Agendamento de Consulta (SUS)" showBackButton backUrl="/" />

      <main className="container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                <KeyRound className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-slate-900 dark:text-white">
              Trocar Senha
            </CardTitle>
            <p className="text-center text-slate-600 dark:text-slate-300">
              Preencha os campos abaixo para alterar sua senha
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Senha atual */}
              <div className="space-y-2">
                <Label htmlFor="senhaAtual" className="text-slate-700 dark:text-slate-300">
                  Senha atual
                </Label>
                <div className="relative">
                  <Input
                    id="senhaAtual"
                    name="senhaAtual"
                    type={showSenhaAtual ? "text" : "password"}
                    value={formData.senhaAtual}
                    onChange={handleChange}
                    placeholder="Digite sua senha atual"
                    className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowSenhaAtual(!showSenhaAtual)}
                  >
                    {showSenhaAtual ? (
                      <EyeOff className="h-4 w-4 text-slate-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-500" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Nova senha */}
              <div className="space-y-2">
                <Label htmlFor="novaSenha" className="text-slate-700 dark:text-slate-300">
                  Nova senha
                </Label>
                <div className="relative">
                  <Input
                    id="novaSenha"
                    name="novaSenha"
                    type={showNovaSenha ? "text" : "password"}
                    value={formData.novaSenha}
                    onChange={handleChange}
                    placeholder="Digite sua nova senha"
                    className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowNovaSenha(!showNovaSenha)}
                  >
                    {showNovaSenha ? (
                      <EyeOff className="h-4 w-4 text-slate-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-500" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Confirmar nova senha */}
              <div className="space-y-2">
                <Label htmlFor="confirmarSenha" className="text-slate-700 dark:text-slate-300">
                  Confirmar nova senha
                </Label>
                <div className="relative">
                  <Input
                    id="confirmarSenha"
                    name="confirmarSenha"
                    type={showConfirmarSenha ? "text" : "password"}
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    placeholder="Confirme sua nova senha"
                    className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmarSenha(!showConfirmarSenha)}
                  >
                    {showConfirmarSenha ? (
                      <EyeOff className="h-4 w-4 text-slate-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-500" />
                    )}
                  </Button>
                </div>

                {/* Feedback visual de validação */}
                {formData.confirmarSenha.length > 0 && (
                  <p
                    className={`text-sm ${
                      formData.novaSenha === formData.confirmarSenha
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {formData.novaSenha === formData.confirmarSenha
                      ? "As senhas coincidem"
                      : "As senhas não coincidem"}
                  </p>
                )}
              </div>

              {/* Lembrar de mim *
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lembrar"
                  name="lembrar"
                  checked={formData.lembrar}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, lembrar: checked as boolean }))
                  
                />*
                <Label htmlFor="lembrar" className="text-sm text-slate-700 dark:text-slate-300">
                  Lembrar de mim
                </Label>
              </div>*/}

              {/* Botão confirmar */}
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                disabled={loading || formData.novaSenha !== formData.confirmarSenha}
              >
                {loading ? "Confirmando..." : "Confirmar"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
