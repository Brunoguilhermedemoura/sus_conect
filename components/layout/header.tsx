import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

interface HeaderProps {
  showBackButton?: boolean
  backUrl?: string
  title?: string
}

export function Header({ showBackButton = false, backUrl = "/", title }: HeaderProps) {
  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-900 dark:to-blue-800 shadow-lg">
      <div className="container mx-auto py-4 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <Button variant="ghost" size="icon" className="text-white hover:bg-blue-600/20" asChild>
              <Link href={backUrl}>
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Voltar</span>
              </Link>
            </Button>
          )}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
              <img src="/sus-logo.png" alt="Logo SUS" className="h-7 w-7" />
            </div>
            <h1 className="text-lg md:text-xl font-semibold text-white">
              {title || "Sistema de Agendamento de Consulta (SUS)"}
            </h1>
          </div>
        </div>
        <ModeToggle />
      </div>
    </header>
  )
}
