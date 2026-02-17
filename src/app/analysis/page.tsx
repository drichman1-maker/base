
import { getRecentArticles } from "@/lib/articles"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function AnalysisPage() {
    const articles = await getRecentArticles()

    return (
        <div className="container py-10 space-y-8">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold">Market Intelligence</h1>
                <p className="text-xl text-muted-foreground">Deep dives, data analysis, and grading strategy guides.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                    <Link key={article.slug} href={`/analysis/${article.slug}`}>
                        <Card className="h-full hover:shadow-lg transition-all hover:border-primary/50 cursor-pointer group">
                            <div className="h-48 bg-muted rounded-t-lg relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <div className="flex gap-2 mb-2">
                                        {article.tags.map(tag => (
                                            <Badge key={tag} variant="secondary" className="text-xs bg-white/20 hover:bg-white/30 text-white border-none">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <CardHeader>
                                <CardTitle className="group-hover:text-primary transition-colors">{article.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground line-clamp-3">
                                    {article.excerpt}
                                </p>
                                <div className="mt-4 text-sm text-muted-foreground">
                                    {new Date(article.publishedAt).toLocaleDateString()}
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
