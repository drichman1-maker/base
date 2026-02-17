
"use client"

import { useEffect, useState } from "react"
import { getPortfolio, PortfolioItem } from "@/lib/storage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

export default function PortfolioPage() {
    const [items, setItems] = useState<PortfolioItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setItems(getPortfolio())
        setLoading(false)
    }, [])

    const totalValue = items.length * 1500 // Mock value per card for demo

    if (loading) return <div className="container py-10">Loading portfolio...</div>

    return (
        <div className="container py-10 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold">My Portfolio</h1>
                    <p className="text-muted-foreground">Tracking {items.length} assets</p>
                </div>
                <div className="text-right">
                    <div className="text-sm text-muted-foreground">Total Value</div>
                    <div className="text-3xl font-bold text-primary">${totalValue.toLocaleString()}</div>
                </div>
            </div>

            {items.length === 0 ? (
                <Card className="border-dashed">
                    <CardContent className="py-20 text-center space-y-4">
                        <p className="text-muted-foreground">Your portfolio is empty.</p>
                        <Link href="/market">
                            <Button>Browse Marketplace</Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {items.map((item) => (
                        <Card key={item.id} className="relative group">
                            <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 invisible group-hover:visible z-10 h-8 w-8"
                                onClick={() => {
                                    // Simple remove logic for demo
                                    const newItems = items.filter(i => i.id !== item.id)
                                    setItems(newItems)
                                    localStorage.setItem("gradebase_portfolio", JSON.stringify(newItems))
                                }}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                            <Link href={`/cards/${item.slug}`}>
                                <div className="aspect-[3/4] bg-muted relative rounded-t-lg overflow-hidden">
                                    {item.imageUrl ? (
                                        <img src={item.imageUrl} alt={item.title} className="object-cover w-full h-full" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-muted-foreground bg-accent/50">No Image</div>
                                    )}
                                </div>
                                <CardHeader className="p-4">
                                    <CardTitle className="text-sm line-clamp-2">{item.title}</CardTitle>
                                    <div className="text-xs text-muted-foreground mt-1">
                                        Added {new Date(item.dateAdded).toLocaleDateString()}
                                    </div>
                                </CardHeader>
                            </Link>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
