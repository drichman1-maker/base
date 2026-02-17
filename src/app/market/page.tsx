
import { db } from "@/lib/db"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function MarketPage({ searchParams }: { searchParams: { q?: string, grade?: string } }) {
    const query = searchParams.q
    const gradeFilter = searchParams.grade // filtering by gradedCardId directly if linked from analysis

    // Prepare filter logic
    let where: any = {}
    if (query) {
        where = {
            title: { contains: query } // SQLite/Postgres supports contains or ILIKE
        }
    }
    if (gradeFilter) {
        where = { ...where, gradedCardId: gradeFilter }
    }

    const listings = await db.listing.findMany({
        where,
        take: 50,
        orderBy: { createdAt: 'desc' },
        include: {
            gradedCard: {
                include: { card: { include: { player: true, set: true } } }
            }
        }
    })

    // Also fetch "Market Movers" (cards with recent sales momentum) - mocked query
    const movers = await db.card.findMany({
        take: 5,
        orderBy: { momentumScore: 'desc' },
        include: { player: true }
    })

    return (
        <div className="container py-8 space-y-8">
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold">Marketplace</h1>
                <p className="text-muted-foreground">Browse active listings from eBay, Goldin, and PWCC.</p>

                <form className="flex gap-2 max-w-lg">
                    <Input name="q" placeholder="Search Listings..." defaultValue={query} />
                    <Button type="submit">Search</Button>
                </form>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Filters */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Market Movers</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {movers.map(m => (
                                <Link key={m.id} href={`/cards/${m.slug}`} className="block group">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium group-hover:underline text-sm">{m.player.name}</span>
                                        <Badge variant="secondary" className="text-xs">+{m.momentumScore}%</Badge>
                                    </div>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Recent Sales</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">Real-time ticker coming soon.</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Listings Grid */}
                <div className="lg:col-span-3">
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Active Listings ({listings.length})</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {listings.length === 0 ? (
                                <div className="col-span-3 py-10 text-center text-muted-foreground border border-dashed rounded-lg">
                                    No listings found matching your criteria.
                                </div>
                            ) : (
                                listings.map((l) => (
                                    <a key={l.id} href={l.url} target="_blank" rel="noopener noreferrer">
                                        <Card className="h-full hover:border-primary transition-colors">
                                            <div className="aspect-square bg-muted relative rounded-t-lg overflow-hidden">
                                                {l.imageUrl || l.gradedCard.card.imageUrl ? (
                                                    <img src={l.imageUrl || l.gradedCard.card.imageUrl!} alt={l.title} className="object-cover w-full h-full" />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full text-muted-foreground bg-accent/50">Details</div>
                                                )}
                                                <Badge className="absolute top-2 right-2 bg-black/70 hover:bg-black/80">
                                                    {l.gradedCard.gradingCompany} {l.gradedCard.grade}
                                                </Badge>
                                            </div>
                                            <CardContent className="p-4 space-y-2">
                                                <h3 className="font-semibold text-sm line-clamp-2" title={l.title}>{l.title}</h3>
                                                <div className="flex justify-between items-center pt-2">
                                                    <span className="font-bold text-lg">${l.price.toLocaleString()}</span>
                                                    <span className="text-xs text-muted-foreground capitalize">{l.source}</span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </a>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
