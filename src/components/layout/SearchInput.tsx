
"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function SearchInput() {
    const router = useRouter()
    const [query, setQuery] = useState("")

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            router.push(`/market?q=${encodeURIComponent(query)}`)
        }
    }

    return (
        <form onSubmit={handleSearch} className="relative w-full md:w-64 lg:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search players, sets, or cards..."
                className="pl-9 w-full bg-muted/50 focus:bg-background transition-colors"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </form>
    )
}
