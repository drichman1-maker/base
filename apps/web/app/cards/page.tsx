import { prisma } from "@slugger/db/client"
import { CardGrid } from "@slugger/ui/components/card-grid"

export default async function CardsPage() {
  const cards = await prisma.card.findMany({
    include: {
      player: true,
      set: true,
      gradedCards: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Browse Cards</h1>
          <p className="text-muted-foreground mt-2">
            {cards.length} graded baseball cards tracked
          </p>
        </div>
        
        <CardGrid cards={cards} />
      </div>
    </main>
  )
}
