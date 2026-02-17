
import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PageProps {
    params: { slug: string }
}

export default async function SetPage({ params }: PageProps) {
    const set = await db.set.findUnique({
        where: { slug: params.slug },
        include: {
            cards: {
                include: { set: true, player: true }
            }
        }
    })

    if (!set) notFound()

    return (
        <div className="container py-10 space-y-8">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold">{set.year} {set.name}</h1>
                <p className="max-w-2xl text-muted-foreground">{set.description}</p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Checklist</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {set.cards.map((card) => (
                        <Link key={card.id} href={`/cards/${card.slug}`}>
                            <Card className="h-full hover:shadow-lg transition-shadow">
                                <div className="aspect-[3/4] bg-muted relative rounded-t-lg overflow-hidden">
                                    {card.imageUrl ? (
                                        <img src={card.imageUrl} alt={card.slug} className="object-cover w-full h-full" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-muted-foreground bg-accent/50">No Image</div>
                                    )}
                                </div>
                                <CardHeader className="p-4">
                                    <CardTitle className="text-sm">
                                        {card.player.name} #{card.cardNumber}
                                    </CardTitle>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
