import Image from "next/image"
import Link from "next/link"
import { GraderBadge } from "./grader-badge"
import { MarketStats } from "./market-stats"

interface Card {
  id: string
  slug: string
  number?: string | null
  imageUrl?: string | null
  fairValueScore?: number | null
  liquidityIndex?: number | null
  momentumScore?: number | null
  volatilityScore?: number | null
  player: {
    name: string
    slug: string
  }
  set: {
    name: string
    year: number
    brand: string
  }
  gradedCards: {
    id: string
    grader: string
    grade: string
    population?: number | null
  }[]
}

interface CardGridProps {
  cards: Card[]
}

export function CardGrid({ cards }: CardGridProps) {
  if (cards.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No cards found
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <Link
          key={card.id}
          href={`/cards/${card.slug}`}
          className="group block rounded-lg border bg-card p-4 hover:shadow-md transition-shadow"
        >
          <div className="aspect-[2/3] relative mb-4 bg-muted rounded overflow-hidden">
            {card.imageUrl ? (
              <Image
                src={card.imageUrl}
                alt={`${card.player.name} ${card.set.year} ${card.set.name}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <span className="text-4xl">⚾</span>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold leading-tight group-hover:text-primary transition-colors">
              {card.player.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {card.set.year} {card.set.brand} #{card.number}
            </p>
            
            {card.gradedCards.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-2">
                {card.gradedCards.slice(0, 4).map((gc) => (
                  <GraderBadge
                    key={gc.id}
                    grader={gc.grader}
                    grade={gc.grade}
                  />
                ))}
                {card.gradedCards.length > 4 && (
                  <span className="text-xs text-muted-foreground px-1">
                    +{card.gradedCards.length - 4} more
                  </span>
                )}
              </div>
            )}
            
            <MarketStats
              fairValueScore={card.fairValueScore || undefined}
              liquidityIndex={card.liquidityIndex || undefined}
              momentumScore={card.momentumScore || undefined}
              volatilityScore={card.volatilityScore || undefined}
            />
          </div>
        </Link>
      ))}
    </div>
  )
}
