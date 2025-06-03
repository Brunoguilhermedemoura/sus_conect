import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

interface SimpleHeaderProps {
  showBackButton?: boolean
  backUrl?: string
  title?: string
}

export function SimpleHeader({ showBackButton = false, backUrl = "/", title }: SimpleHeaderProps) {
  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto py-4 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              asChild
            >
              <Link href={backUrl}>
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Voltar</span>
              </Link>
            </Button>
          )}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">
              SUS
            </div>
            <h1 className="text-lg font-medium text-gray-900 dark:text-gray-100">{title || "SUS Connect"}</h1>
          </div>
        </div>
        <ModeToggle />
      </div>
    </header>
  )
}
