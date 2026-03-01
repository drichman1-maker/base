import Link from "next/link"

export function Navigation() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Slugger
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link
            href="/cards"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Cards
          </Link>
          <Link
            href="/players"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Players
          </Link>
        </nav>
      </div>
    </header>
  )
}
