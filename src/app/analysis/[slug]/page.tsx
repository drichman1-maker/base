
import { getArticleBySlug } from "@/lib/articles"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"

interface PageProps {
    params: { slug: string }
}

export default async function ArticlePage({ params }: PageProps) {
    const article = await getArticleBySlug(params.slug)

    if (!article) notFound()

    return (
        <div className="container max-w-4xl py-12 space-y-8">
            <div className="space-y-4 text-center">
                <div className="flex justify-center gap-2">
                    {article.tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{article.title}</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{article.excerpt}</p>
                <div className="text-sm text-muted-foreground">
                    Published {new Date(article.publishedAt).toLocaleDateString()}
                </div>
            </div>

            <div className="prose prose-lg dark:prose-invert mx-auto">
                {/* Simple markdown rendering for demo */}
                <pre className="whitespace-pre-wrap font-sans text-foreground">
                    {article.content}
                </pre>
            </div>
        </div>
    )
}
