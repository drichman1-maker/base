
import { db } from "@/lib/db"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function Home() {
  // Fetch cards (Mock 'trending' by just taking the first 4)
  const trendingCards = await db.card.findMany({
    take: 4,
    include: {
      player: true,
      set: true,
    }
  })

  return (
    <div className="flex flex-col min-h-screen">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
            The Intelligence Layer for Graded Cards.
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Discovery, Fair Value, and Portfolio Tracking for the modern collector.
            Aggregating listings from eBay, Goldin, PWCC, and more.
          </p>
          <div className="flex gap-4">
            <Link
              href="/market"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Explore Market
            </Link>
            <Link
              href="/registry"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              View Collections
            </Link>
          </div>
        </div>
      </section>

      <section className="container py-8 md:py-12 lg:py-24 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Trending Cards</h2>
          <Link href="/market" className="text-sm font-medium hover:underline">View All</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingCards.length === 0 ? (
            <div className="col-span-4 text-center py-12 text-muted-foreground border border-dashed rounded-lg">
              No cards found. Database needs seeding.
            </div>
          ) : (
            trendingCards.map((card) => (
              <Link key={card.id} href={`/cards/${card.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-[3/4] bg-muted relative rounded-t-lg overflow-hidden">
                    {card.imageUrl ? (
                      <img src={card.imageUrl} alt={card.slug} className="object-cover w-full h-full" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">No Image</div>
                    )}
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg line-clamp-2">
                      {card.set.year} {card.set.name} {card.player.name} #{card.cardNumber}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex justify-between items-center text-sm">
                      <div className="text-muted-foreground">Fair Value</div>
                      <div className="font-bold">${card.fairValueScore?.toLocaleString() ?? '---'}</div>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-1">
                      <div className="text-muted-foreground">Liquidity</div>
                      <Badge variant="secondary" className="text-xs">{card.liquidityIndex ?? 0}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
