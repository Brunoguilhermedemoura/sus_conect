"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash, Plus, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Especialidade {
  id: string
  nome: string
}

export default function CadastroEspecialidades() {
  const { toast } = useToast()
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [nome, setNome] = useState<string>("")
  const [submitting, setSubmitting] = useState<boolean>(false)

  useEffect(() => {
    carregarEspecialidades()
  }, [])

  const carregarEspecialidades = () => {
    setLoading(true)
    // Simulando carregamento de dados
    setTimeout(() => {
      const mockEspecialidades: Especialidade[] = [
        { id: "1", nome: "Cardiologia" },
        { id: "2", nome: "Dermatologia" },
        { id: "3", nome: "Ortopedia" },
        { id: "4", nome: "Pediatria" },
        { id: "5", nome: "Neurologia" },
      ]
      setEspecialidades(mockEspecialidades)
      setLoading(false)
    }, 1000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nome.trim()) {
      toast({
        title: "Erro",
        description: "O nome da especialidade é obrigatório.",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    // Simulando envio de dados
    setTimeout(() => {
      // Adicionar nova especialidade com ID simulado
      const novaEspecialidade: Especialidade = {
        id: (especialidades.length + 1).toString(),
        nome: nome,
      }
      setEspecialidades([...especialidades, novaEspecialidade])
      setNome("")
      setSubmitting(false)
      toast({
        title: "Sucesso",
        description: "Especialidade cadastrada com sucesso!",
      })
    }, 1000)
  }

  const excluirEspecialidade = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta especialidade?")) {
      setLoading(true)
      // Simulando exclusão
      setTimeout(() => {
        setEspecialidades(especialidades.filter((esp) => esp.id !== id))
        setLoading(false)
        toast({
          title: "Sucesso",
          description: "Especialidade excluída com sucesso!",
        })
      }, 500)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 to-blue-700">
      <Header showBackButton backUrl="/configuracoes" />
      <main className="flex-1 container mx-auto p-4">
        <Card className="bg-white/10 text-white border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-center">Cadastro de Especialidades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Formulário de cadastro */}
              <div className="space-y-4 bg-white/5 p-4 rounded-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome" className="text-white">
                      Nome da Especialidade
                    </Label>
                    <Input
                      id="nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Digite o nome da especialidade"
                      className="bg-white/20 border-white/10 text-white placeholder:text-gray-300"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700" disabled={submitting}>
                      <Plus className="mr-2 h-4 w-4" />
                      {submitting ? "Cadastrando..." : "Cadastrar"}
                    </Button>
                    <Button
                      type="reset"
                      variant="secondary"
                      className="flex-1"
                      onClick={() => setNome("")}
                      disabled={submitting}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Limpar
                    </Button>
                  </div>
                </form>
              </div>

              {/* Tabela de especialidades */}
              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-3">Especialidades Cadastradas</h3>
                <div className="rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader className="bg-primary">
                      <TableRow>
                        <TableHead className="text-white">ID</TableHead>
                        <TableHead className="text-white">Nome</TableHead>
                        <TableHead className="text-white w-[100px]">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center py-8 text-white">
                            Carregando especialidades...
                          </TableCell>
                        </TableRow>
                      ) : especialidades.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center py-8 text-white">
                            Nenhuma especialidade cadastrada.
                          </TableCell>
                        </TableRow>
                      ) : (
                        especialidades.map((especialidade) => (
                          <TableRow key={especialidade.id} className="border-b border-white/10 hover:bg-white/5">
                            <TableCell className="text-white">{especialidade.id}</TableCell>
                            <TableCell className="text-white">{especialidade.nome}</TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => excluirEspecialidade(especialidade.id)}
                              >
                                <Trash className="h-4 w-4" />
                                <span className="sr-only">Excluir</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
