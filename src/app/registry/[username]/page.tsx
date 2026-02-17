
import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface PageProps {
    params: { username: string }
}

export default async function RegistryProfilePage({ params }: PageProps) {
    const user = await db.user.findUnique({
        where: { username: params.username },
        include: {
            collections: {
                include: {
                    items: {
                        include: { gradedCard: { include: { card: { include: { player: true, set: true } } } } }
                    }
                }
            }
        }
    })

    if (!user) {
        // Mock for demo if not found in seeded data
        if (params.username === 'demo') {
            return <DemoRegistry />
        }
        notFound()
    }

    const primaryCollection = user.collections[0]

    return (
        <div className="container py-10 space-y-8">
            <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                    <AvatarImage src={user.image ?? ""} />
                    <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-3xl font-bold">{user.username}'s Registry</h1>
                    <p className="text-muted-foreground">Member since {new Date(user.createdAt).getFullYear()}</p>
                </div>
            </div>

            {primaryCollection ? (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader className="text-sm font-medium text-muted-foreground">Total Value</CardHeader>
                            <CardContent className="text-2xl font-bold">${primaryCollection.totalValue.toLocaleString()}</CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="text-sm font-medium text-muted-foreground">Cards</CardHeader>
                            <CardContent className="text-2xl font-bold">{primaryCollection.itemCount}</CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="text-sm font-medium text-muted-foreground">Rank</CardHeader>
                            <CardContent className="text-2xl font-bold">#42</CardContent>
                        </Card>
                    </div>

                    <Card>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Card</TableHead>
                                    <TableHead>Grade</TableHead>
                                    <TableHead>Est. Value</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {primaryCollection.items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            {item.gradedCard.card.set.year} {item.gradedCard.card.player.name}
                                        </TableCell>
                                        <TableCell>
                                            {item.gradedCard.gradingCompany} {item.gradedCard.grade}
                                        </TableCell>
                                        <TableCell>${item.gradedCard.marketValue?.toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </div>
            ) : (
                <div className="text-center py-12 text-muted-foreground">No active collections.</div>
            )}
        </div>
    )
}

function DemoRegistry() {
    return (
        <div className="container py-10 space-y-8">
            <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                    <AvatarFallback>D</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-3xl font-bold">Demo User</h1>
                    <p className="text-muted-foreground">Member since 2024</p>
                </div>
            </div>
            <div className="p-8 border border-dashed rounded-lg text-center">
                This is a mock registry page.
            </div>
        </div>
    )
}
