"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { SimpleHeader } from "@/components/layout/simple-header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, MapPin, Loader2, Eye, XCircle } from "lucide-react"

// Componente do mapa que será carregado dinamicamente apenas no cliente
const DynamicMap = dynamic(
  () => import("./map-component").then((mod) => mod.DynamicMap),
  { ssr: false }
)

export default function BuscarUnidades() {
  const [estadoInput, setEstadoInput] = useState("")
  const [cidadeInput, setCidadeInput] = useState("")
  const [unidades, setUnidades] = useState<any[]>([])
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [selectedUnit, setSelectedUnit] = useState<any | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    setUnidades([])
    setSelectedUnit(null)

    try {
      const query = `unidade de saúde, ${cidadeInput}, ${estadoInput}`
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=15&addressdetails=1`
      )
      const data = await response.json()

      if (!Array.isArray(data) || data.length === 0) {
        setMessage("Nenhuma unidade encontrada para essa cidade e estado.")
      } else {
        const results = data.map((item: any, index: number) => ({
          id: item.place_id || `nominatim-${index}`,
          nome: item.display_name,
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon),
        }))
        setUnidades(results)
        setMessage("")
      }
    } catch (error) {
      setMessage("Erro ao buscar unidades. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-slate-100 to-emerald-100 dark:from-slate-900 dark:via-emerald-900 dark:to-slate-950">
      <SimpleHeader title="Unidades de Saúde" showBackButton backUrl="/" />

      <main className="container mx-auto px-4 py-12 flex flex-col items-center">
        <Card className="shadow-2xl rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md w-full max-w-2xl mb-10 transform transition hover:scale-105">
          <CardHeader className="pt-8">
            <div className="flex justify-center mb-4">
              <div className={`p-5 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 dark:from-emerald-700 dark:to-emerald-900 shadow-lg ${loading ? 'animate-pulse' : ''}`}>
                <MapPin className="h-9 w-9 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-extrabold text-center text-slate-800 dark:text-slate-100">
              Busque Unidades de Saúde
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-8">
            <form onSubmit={handleSearch} className="space-y-6">
              <div>
                <Label htmlFor="estado">Estado (UF)</Label>
                <Input
                  id="estado"
                  value={estadoInput}
                  onChange={(e) => setEstadoInput(e.target.value.toUpperCase())}
                  placeholder="Ex: SC, SP"
                  required
                  maxLength={2}
                  className="rounded-xl h-11 dark:bg-slate-700"
                />
              </div>
              <div>
                <Label htmlFor="cidade">Cidade</Label>
                <Input
                  id="cidade"
                  value={cidadeInput}
                  onChange={(e) => setCidadeInput(e.target.value)}
                  placeholder="Ex: Chapecó"
                  required
                  className="rounded-xl h-11 dark:bg-slate-700"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white rounded-xl text-base py-3 flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                {loading ? "Buscando..." : "Buscar Unidades"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {message && (
          <div className="w-full max-w-2xl bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 rounded-xl p-4 mb-8 text-center font-semibold shadow">
            {message}
          </div>
        )}

        {unidades.length > 0 && (
          <div className="w-full max-w-2xl mb-8 space-y-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 text-center">
              Unidades Encontradas ({unidades.length})
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {unidades.map((uni) => (
                <div
                  key={uni.id}
                  className={`p-4 rounded-xl shadow-lg bg-white dark:bg-slate-700 hover:ring-2 hover:ring-emerald-400 transition ${selectedUnit && selectedUnit.id === uni.id ? "ring-2 ring-emerald-500" : ""
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="w-2/3">
                      <p className="font-bold text-emerald-700 dark:text-emerald-400 mb-1 truncate">{uni.nome.split(",")[0]}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 truncate">{uni.nome}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedUnit(uni)}
                      className="flex items-center gap-1 text-sm"
                    >
                      <Eye className="h-4 w-4" />
                      Ver no mapa
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedUnit && (
          <div className="w-full max-w-5xl h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-slate-300 dark:border-slate-700 mb-10">
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white text-sm font-semibold">
              <span>Visualizando: {selectedUnit.nome.split(",")[0]}</span>
              <button
                onClick={() => setSelectedUnit(null)}
                className="flex items-center gap-1 text-sm hover:text-emerald-300"
              >
                <XCircle className="h-4 w-4" />
                Fechar mapa
              </button>
            </div>
            <DynamicMap selectedUnit={selectedUnit} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
