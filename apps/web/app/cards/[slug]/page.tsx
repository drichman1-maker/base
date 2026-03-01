import Image from "next/image"
import { notFound } from "next/navigation"
import { prisma } from "@slugger/db/client"
import { PlayerHero } from "@slugger/ui/components/player-hero"
import { GraderBadge } from "@slugger/ui/components/grader-badge"
import { MarketStats } from "@slugger/ui/components/market-stats"
import { SoldListings } from "@slugger/ui/components/sold-listings"

interface CardPageProps {
  params: {
    slug: string
  }
}

export default async function CardPage({ params }: CardPageProps) {
  const card = await prisma.card.findUnique({
    where: { slug: params.slug },
    include: {
      player: true,
      set: true,
      gradedCards: {
        include: {
          sales: {
            orderBy: { date: "desc" },
          },
        },
      },
    },
  })

  if (!card) {
    notFound()
  }

  // Aggregate sales from all graded variants
  const allSales = card.gradedCards
    .flatMap((gc) => gc.sales)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10)

  return (
    <main className="min-h-screen bg-background">
      <PlayerHero player={card.player} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Card image and info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold">
                  {card.set.year} {card.set.brand} #{card.number}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {card.description || `${card.player.name} rookie card`}
                </p>
              </div>
            </div>

            <div className="aspect-[2/3] relative bg-muted rounded-lg overflow-hidden max-w-md">
              {card.imageUrl ? (
                <Image
                  src={card.imageUrl}
                  alt={`${card.player.name} ${card.set.year} ${card.set.name}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <span className="text-6xl">⚾</span>
                </div>
              )}
            </div>

            <MarketStats
              fairValueScore={card.fairValueScore || undefined}
              liquidityIndex={card.liquidityIndex || undefined}
              momentumScore={card.momentumScore || undefined}
              volatilityScore={card.volatilityScore || undefined}
            />
          </div>

          {/* Right column - Graded variants and sales */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Graded Variants</h2>
              <div className="space-y-3">
                {card.gradedCards.map((gradedCard) => (
                  <div
                    key={gradedCard.id}
                    className="p-4 border rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <GraderBadge
                        grader={gradedCard.grader}
                        grade={gradedCard.grade}
                      />
                      {gradedCard.population && (
                        <span className="text-sm text-muted-foreground">
                          Pop: {gradedCard.population.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {gradedCard.sales.length} recent sales
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <SoldListings sales={allSales} />
          </div>
        </div>
      </div>
    </main>
  )
}
