
import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { generateInvestmentAnalysis } from "@/lib/ai-content"
import { CardActions } from "@/components/card/CardActions"
import { PriceHistoryChart } from "@/components/card/PriceHistoryChart"
import { RelatedCards } from "@/components/card/RelatedCards" // Mocked import path, need to create file or fix import

interface PageProps {
    params: { slug: string }
}

export default async function CardPage({ params }: PageProps) {
    const card = await db.card.findUnique({
        where: { slug: params.slug },
        include: {
            player: true,
            set: true,
            gradedCards: {
                include: {
                    recentSales: {
                        orderBy: { date: 'desc' },
                        take: 1
                    },
                    listings: {
                        where: { expiresAt: { gt: new Date() } }, // Mock logic, schema doesn't strict enforce
                        take: 3
                    }
                }
            }
        }
    })

    if (!card) {
        notFound()
    }


    return (
        <div className="container py-10 space-y-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3">
                    <div className="aspect-[3/4] bg-muted relative rounded-lg overflow-hidden border">
                        {card.imageUrl ? (
                            <img src={card.imageUrl} alt={card.slug} className="object-cover w-full h-full" />
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground bg-accent/50">No Image Available</div>
                        )}
                    </div>
                </div>

                <div className="w-full md:w-2/3 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{card.set.year} {card.set.name} {card.player.name} #{card.cardNumber}</h1>
                            <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                                <span>{card.set.manufacturer}</span>
                                <span>•</span>
                                <span>{card.set.name}</span>
                            </div>
                        </div>
                        <CardActions card={{
                            id: card.id,
                            slug: card.slug,
                            title: `${card.set.year} ${card.set.name} ${card.player.name} #${card.cardNumber}`,
                            imageUrl: card.imageUrl || ""
                        }} />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Fair Value</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">${(card.fairValueScore || 0).toLocaleString()}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Liquidity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{card.liquidityIndex}/100</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Momentum</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-500">+{card.momentumScore}%</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Volatility</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{card.volatilityScore}/100</div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Price History Chart */}
            <PriceHistoryChart />

            {/* AI Analysis */}
            <Card className="bg-muted/50 border-primary/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        Scan_Protocol_Alpha // Market Intelligence
                        <Badge variant="outline" className="ml-auto font-mono text-xs">AI GENERATED</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                        {/* We render markdown safely - in real app use react-markdown */}
                        <pre className="whitespace-pre-wrap font-sans text-sm text-muted-foreground">
                            {generateInvestmentAnalysis(card)}
                        </pre>
                    </div>
                </CardContent>
            </Card>

            {/* Graded Analysis */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Graded Analysis</h2>
                <Card>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Grade</TableHead>
                                <TableHead>Pop</TableHead>
                                <TableHead>Market Value</TableHead>
                                <TableHead>Last Sale</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {card.gradedCards.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">No graded data available.</TableCell>
                                </TableRow>
                            ) : (
                                card.gradedCards.map((gc) => (
                                    <TableRow key={gc.id}>
                                        <TableCell className="font-medium">
                                            <Badge variant="outline" className="mr-2">{gc.gradingCompany}</Badge>
                                            {gc.grade}
                                        </TableCell>
                                        <TableCell>{gc.population}</TableCell>
                                        <TableCell>${gc.marketValue?.toLocaleString() ?? '---'}</TableCell>
                                        <TableCell>
                                            {gc.recentSales[0] ? (
                                                <div className="flex flex-col">
                                                    <span>${gc.recentSales[0].price.toLocaleString()}</span>
                                                    <span className="text-xs text-muted-foreground">{new Date(gc.recentSales[0].date).toLocaleDateString()}</span>
                                                </div>
                                            ) : '---'}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm" variant="ghost" asChild>
                                                <Link href={`/market?grade=${gc.id}`}>Find Deals</Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </Card>
            </div>

            {/* Eternal Linking */}
            <RelatedCards cardId={card.id} setId={card.set.id} playerId={card.player.id} />
        </div>
    )
}
