// @ts-nocheck
import { db } from "@/lib/db"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RelatedCardsProps {
    cardId: string
    setId: string
    playerId: string
}

export async function RelatedCards({ cardId, setId, playerId }: RelatedCardsProps) {
    // Eternal Linking Logic: 
    // 1. Same Set (horizontal linking)
    // 2. Same Player (vertical linking)

    // Fetch mocks or real data depending on DB state
    const setMates = await db.card.findMany({
        where: { setId, NOT: { id: cardId } },
        take: 3,
        include: { player: true, set: true }
    })

    const playerMates = await db.card.findMany({
        where: { playerId, NOT: { id: cardId } },
        take: 3,
        include: { player: true, set: true }
    })

    const related = [...setMates, ...playerMates].slice(0, 4) // Dedupe logic needed in full app

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold">Discovery Engine (Related Cards)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map(r => (
                    <Link key={r.id} href={`/cards/${r.slug}`} className="group">
                        <Card className="h-full hover:border-primary transition-colors">
                            <CardContent className="p-3 space-y-2">
                                <div className="aspect-[3/4] bg-muted relative rounded overflow-hidden">
                                    {r.imageUrl ? (
                                        <img src={r.imageUrl} alt={r.title} className="object-cover w-full h-full" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-xs text-muted-foreground bg-accent/50">Img</div>
                                    )}
                                </div>
                                <div>
                                    <div className="text-xs text-muted-foreground">{r.set.year} {r.set.name}</div>
                                    <div className="font-medium text-sm leading-tight group-hover:underline">{r.player.name}</div>
                                    <Badge variant="secondary" className="mt-2 text-[10px] h-5">From ${r.id.slice(0, 3)}</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
