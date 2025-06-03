"use client"

import type React from "react"

import { useState } from "react"
import { SimpleHeader } from "@/components/layout/simple-header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, LogIn, User, UserCheck } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function Login() {
  const router = useRouter()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userType, setUserType] = useState("")
  const [formData, setFormData] = useState({
    cpf: "",
    senha: "",
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

    if (!formData.cpf || !formData.senha || !userType) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    // Simulando autenticação
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Sucesso",
        description: "Login realizado com sucesso!",
      })

      // Redirecionar baseado no tipo de usuário
      if (userType === "paciente") {
        router.push("/dashboard")
      } else if (userType === "atendente") {
        router.push("/atendente")
      } else if (userType === "profissional") {
        router.push("/atendente") // Profissionais também vão para a área do atendente
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-900">
      <SimpleHeader title="Acesso ao Sistema" showBackButton backUrl="/dashboard" /> 

      <main className="container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                <LogIn className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-slate-900 dark:text-white">
              Entrar no Sistema
            </CardTitle>
            <p className="text-center text-slate-600 dark:text-slate-300">Acesse sua conta do SUS Digital</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userType" className="text-slate-700 dark:text-slate-300">
                  Tipo de Usuário
                </Label>
                <Select value={userType} onValueChange={setUserType}>
                  <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <SelectValue placeholder="Selecione o tipo de usuário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paciente">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Paciente
                      </div>
                    </SelectItem>
                    <SelectItem value="atendente">
                      <div className="flex items-center">
                        <UserCheck className="h-4 w-4 mr-2" />
                        Atendente
                      </div>
                    </SelectItem>
                    <SelectItem value="profissional">
                      <div className="flex items-center">
                        <UserCheck className="h-4 w-4 mr-2" />
                        Profissional de Saúde
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf" className="text-slate-700 dark:text-slate-300">
                  CPF
                </Label>
                <Input
                  id="cpf"
                  name="cpf"
                  type="text"
                  value={formData.cpf}
                  onChange={handleChange}
                  placeholder="Digite seu CPF"
                  className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha" className="text-slate-700 dark:text-slate-300">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="senha"
                    name="senha"
                    type={showPassword ? "text" : "password"}
                    value={formData.senha}
                    onChange={handleChange}
                    placeholder="Digite sua senha"
                    className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-slate-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-500" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lembrar"
                  name="lembrar"
                  checked={formData.lembrar}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, lembrar: checked as boolean }))}
                />
                <Label htmlFor="lembrar" className="text-sm text-slate-700 dark:text-slate-300">
                  Lembrar de mim
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>

              <div className="space-y-2 text-center">
                <Link
                  href="/esqueceu-senha"
                  className="text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  Esqueceu sua senha?
                </Link>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Não tem uma conta?{" "}
                  <Link
                    href="/cadastro"
                    className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                  >
                    Cadastre-se
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
