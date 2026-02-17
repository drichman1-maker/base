
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SearchInput } from "@/components/layout/SearchInput"

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">
                            GRADEBASE
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link href="/market" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Market
                        </Link>
                        <Link href="/players" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Players
                        </Link>
                        <Link href="/sets" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Sets
                        </Link>
                        <Link href="/analysis" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Analysis
                        </Link>
                        <Link href="/portfolio" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Portfolio
                        </Link>
                        <Link href="/registry" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Registry
                        </Link>
                        <Link href="/grade-advisor" className="transition-colors hover:text-foreground/80 text-foreground/60 font-semibold text-primary">
                            AI Grader
                        </Link>
                    </nav>
                </div>

                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <SearchInput />
                    </div>
                    <nav className="flex items-center gap-2">
                        <Link href="/portfolio">
                            <Button variant="ghost" size="sm">
                                My Cards
                            </Button>
                        </Link>
                        <Button size="sm">
                            Join Now
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    )
}
