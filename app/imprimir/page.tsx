import { Card, CardContent } from "@/components/ui/card"

export default function Imprimir() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <img
            src="/placeholder.svg?height=60&width=120&query=SUS logo"
            alt="Logo SUS"
            className="h-12"
            width={120}
            height={60}
          />
          <div className="text-right">
            <h1 className="text-xl font-bold text-gray-800">Sistema de Agendamento de Consulta (SUS)</h1>
            <p className="text-sm text-gray-600">Comprovante de Agendamento</p>
          </div>
        </div>

        <Card className="border-2 border-gray-200 shadow-none mb-8">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Bruno Guilherme de Moura</h2>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-semibold">RG:</span> 12.345.678-9
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">CPF:</span> 123.456.789-00
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Data de Nascimento:</span> 01/01/1990
                  </p>
                </div>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-sm font-semibold text-gray-700">Código de Atendimento</p>
                <p className="text-xl font-bold text-gray-900">SUS-2024-05678</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Detalhes da Consulta</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Especialidade</p>
                <p className="font-semibold text-gray-800">Cardiologia</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Profissional</p>
                <p className="font-semibold text-gray-800">Dr. João Silva</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Data</p>
                <p className="font-semibold text-gray-800">15/05/2024</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Horário</p>
                <p className="font-semibold text-gray-800">09:30</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Unidade</p>
                <p className="font-semibold text-gray-800">UBS Central</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Endereço</p>
                <p className="font-semibold text-gray-800">Av. Paulista, 1000 - São Paulo/SP</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Orientações</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Chegue com 15 minutos de antecedência.</li>
            <li>Traga este comprovante impresso e um documento com foto.</li>
            <li>Em caso de impossibilidade de comparecimento, cancele com pelo menos 24h de antecedência.</li>
            <li>Traga exames anteriores relacionados à consulta, se houver.</li>
          </ul>
        </div>

        <div className="text-center text-sm text-gray-500 mt-12">
          <p>Este documento foi gerado eletronicamente em 22/05/2024 às 15:30.</p>
          <p>Sistema de Agendamento de Consulta (SUS) - ABEX IV</p>
        </div>
      </div>
    </div>
  )
}
