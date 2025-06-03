"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold">
                SUS
              </div>
              <span className="font-bold text-xl">SUS Connect</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Plataforma digital do Sistema Único de Saúde para facilitar o acesso aos serviços de saúde pública.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/agendamentos"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                >
                  Agendamentos
                </Link>
              </li>
              <li>
                <Link
                  href="/unidades"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                >
                  Unidades de Saúde
                </Link>
              </li>
              <li>
                <Link
                  href="/medicamentos"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                >
                  Medicamentos
                </Link>
              </li>
              <li>
                <Link
                  href="/vacinas"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                >
                  Vacinas
                </Link>
              </li>
              <li>
                <Link
                  href="/exames"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                >
                  Exames
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Informações</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/sobre"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                >
                  Sobre o SUS
                </Link>
              </li>
              <li>
                <Link
                  href="/direitos"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                >
                  Direitos do Paciente
                </Link>
              </li>
              <li>
                <Link
                  href="/perguntas-frequentes"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                >
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-privacidade"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/termos-uso"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                >
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-primary shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">Disque Saúde: 136</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 text-primary shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">ouvidoria@saude.gov.br</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">
                  Esplanada dos Ministérios, Bloco G, Brasília - DF, 70058-900
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} SUS Connect | Sistema Único de Saúde. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
