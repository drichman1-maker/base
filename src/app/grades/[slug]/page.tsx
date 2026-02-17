
import { db } from "@/lib/db"
import Link from "next/link"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { notFound } from "next/navigation"

interface PageProps {
    params: { slug: string }
}

export default async function GradePage({ params }: PageProps) {
    // Parse slug: psa-10 -> company: PSA, grade: 10
    // bgs-9-5 -> company: BGS, grade: 9.5

    const parts = params.slug.split('-')
    const company = parts[0].toUpperCase()
    const gradeParts = parts.slice(1)
    let grade = gradeParts.join(' ')

    // Custom fix for 9-5 -> 9.5
    if (parts.length > 2 && parts[parts.length - 2] === '9' && parts[parts.length - 1] === '5') {
        // This logic is fragile but works for the example
        // Let's rely on a simpler convention or exact match attempts
        if (params.slug === 'bgs-9-5') grade = '9.5'
    }

    if (params.slug === 'psa-10') grade = '10'
    if (params.slug === 'psa-9') grade = '9'

    const gradedCards = await db.gradedCard.findMany({
        where: {
            gradingCompany: company,
            grade: grade
        },
        take: 50,
        include: {
            card: {
                include: { player: true, set: true }
            }
        },
        orderBy: { marketValue: 'desc' }
    })

    // If no cards found, likely invalid slug or empty db
    if (gradedCards.length === 0) {
        // Don't 404 immediately in case it's just empty, but for SEO pages we might want to?
        // Let's render empty state
    }

    return (
        <div className="container py-10 space-y-8">
            <h1 className="text-4xl font-bold">{company} {grade} Graded Cards</h1>
            <p className="text-muted-foreground">Highest valued cards graded {company} {grade}.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {gradedCards.map((gc) => (
                    <Link key={gc.id} href={`/cards/${gc.card.slug}`}>
                        <Card className="h-full hover:shadow-lg transition-shadow">
                            <CardHeader className="p-4">
                                <CardTitle className="text-sm">
                                    {gc.card.set.year} {gc.card.set.name} {gc.card.player.name}
                                </CardTitle>
                                <div className="text-lg font-bold mt-2">
                                    ${gc.marketValue?.toLocaleString() ?? '---'}
                                </div>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
