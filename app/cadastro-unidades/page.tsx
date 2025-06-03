"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Municipio {
  id: string
  nome: string
}

interface Unidade {
  id: string
  unidade_nome: string
  municipio_nome: string
  endereco: string
  cep: string
}

export default function CadastroUnidades() {
  const { toast } = useToast()
  const [municipios, setMunicipios] = useState<Municipio[]>([])
  const [unidades, setUnidades] = useState<Unidade[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [submitting, setSubmitting] = useState<boolean>(false)

  const [formData, setFormData] = useState({
    municipio: "",
    nome: "",
    endereco: "",
    cep: "",
  })

  useEffect(() => {
    carregarMunicipios()
    carregarUnidades()
  }, [])

  const carregarMunicipios = () => {
    // Simulando carregamento de dados
    setTimeout(() => {
      const mockMunicipios: Municipio[] = [
        { id: "1", nome: "São Paulo" },
        { id: "2", nome: "Rio de Janeiro" },
        { id: "3", nome: "Belo Horizonte" },
        { id: "4", nome: "Salvador" },
        { id: "5", nome: "Brasília" },
      ]
      setMunicipios(mockMunicipios)
    }, 1000)
  }

  const carregarUnidades = () => {
    setLoading(true)
    // Simulando carregamento de dados
    setTimeout(() => {
      const mockUnidades: Unidade[] = [
        {
          id: "1",
          unidade_nome: "UBS Central",
          municipio_nome: "São Paulo",
          endereco: "Av. Paulista, 1000",
          cep: "01310-100",
        },
        {
          id: "2",
          unidade_nome: "UBS Vila Mariana",
          municipio_nome: "São Paulo",
          endereco: "Rua Domingos de Morais, 1500",
          cep: "04010-200",
        },
        {
          id: "3",
          unidade_nome: "UBS Copacabana",
          municipio_nome: "Rio de Janeiro",
          endereco: "Av. Atlântica, 500",
          cep: "22010-000",
        },
        {
          id: "4",
          unidade_nome: "UBS Centro",
          municipio_nome: "Belo Horizonte",
          endereco: "Av. Afonso Pena, 1000",
          cep: "30130-000",
        },
      ]
      setUnidades(mockUnidades)
      setLoading(false)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validação básica
    if (!formData.municipio || !formData.nome || !formData.endereco || !formData.cep) {
      toast({
        title: "Erro",
        description: "Todos os campos são obrigatórios.",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    // Simulando envio de dados
    setTimeout(() => {
      const municipioSelecionado = municipios.find((m) => m.id === formData.municipio)

      // Adicionar nova unidade com ID simulado
      const novaUnidade: Unidade = {
        id: (unidades.length + 1).toString(),
        unidade_nome: formData.nome,
        municipio_nome: municipioSelecionado?.nome || "",
        endereco: formData.endereco,
        cep: formData.cep,
      }

      setUnidades([...unidades, novaUnidade])
      setFormData({
        municipio: "",
        nome: "",
        endereco: "",
        cep: "",
      })

      setSubmitting(false)
      toast({
        title: "Sucesso",
        description: "Unidade cadastrada com sucesso!",
      })
    }, 1000)
  }

  const handleReset = () => {
    setFormData({
      municipio: "",
      nome: "",
      endereco: "",
      cep: "",
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 to-blue-700">
      <Header showBackButton backUrl="/configuracoes" />
      <main className="flex-1 container mx-auto p-4">
        <Card className="bg-white/10 text-white border-none shadow-xl mb-6">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-center">Cadastro de Unidades de Saúde</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="municipio" className="text-white">
                    Município
                  </Label>
                  <Select value={formData.municipio} onValueChange={(value) => handleSelectChange("municipio", value)}>
                    <SelectTrigger className="bg-white/20 border-white/10 text-white">
                      <SelectValue placeholder="Selecione o município" />
                    </SelectTrigger>
                    <SelectContent>
                      {municipios.map((municipio) => (
                        <SelectItem key={municipio.id} value={municipio.id}>
                          {municipio.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-white">
                    Nome da Unidade
                  </Label>
                  <Input
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Digite o nome da unidade"
                    className="bg-white/20 border-white/10 text-white placeholder:text-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endereco" className="text-white">
                    Endereço
                  </Label>
                  <Input
                    id="endereco"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleChange}
                    placeholder="Digite o endereço completo"
                    className="bg-white/20 border-white/10 text-white placeholder:text-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cep" className="text-white">
                    CEP
                  </Label>
                  <Input
                    id="cep"
                    name="cep"
                    value={formData.cep}
                    onChange={handleChange}
                    placeholder="Digite o CEP"
                    className="bg-white/20 border-white/10 text-white placeholder:text-gray-300"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700" disabled={submitting}>
                  <Plus className="mr-2 h-4 w-4" />
                  {submitting ? "Cadastrando..." : "Cadastrar"}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={handleReset}
                  disabled={submitting}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Limpar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-white/10 text-white border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-center">Unidades Cadastradas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg overflow-hidden">
              <Table>
                <TableHeader className="bg-primary">
                  <TableRow>
                    <TableHead className="text-white">ID</TableHead>
                    <TableHead className="text-white">Nome</TableHead>
                    <TableHead className="text-white">Município</TableHead>
                    <TableHead className="text-white">Endereço</TableHead>
                    <TableHead className="text-white">CEP</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-white">
                        Carregando unidades...
                      </TableCell>
                    </TableRow>
                  ) : unidades.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-white">
                        Nenhuma unidade cadastrada.
                      </TableCell>
                    </TableRow>
                  ) : (
                    unidades.map((unidade) => (
                      <TableRow key={unidade.id} className="border-b border-white/10 hover:bg-white/5">
                        <TableCell className="text-white">{unidade.id}</TableCell>
                        <TableCell className="text-white">{unidade.unidade_nome}</TableCell>
                        <TableCell className="text-white">{unidade.municipio_nome}</TableCell>
                        <TableCell className="text-white">{unidade.endereco}</TableCell>
                        <TableCell className="text-white">{unidade.cep}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
