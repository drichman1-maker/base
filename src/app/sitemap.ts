
import { MetadataRoute } from 'next'
import { db } from '@/lib/db'
import { getRecentArticles } from "@/lib/articles"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://gradebase.com' // Configure as needed

    // 1. Static Routes
    const staticRoutes = [
        '',
        '/market',
        '/players',
        '/sets',
        '/registry',
        '/analysis',
        '/grade-advisor',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
    }))

    // 2. Dynamic Players
    const players = await db.player.findMany({ select: { slug: true, updatedAt: true } })
    const playerRoutes = players.map((p) => ({
        url: `${baseUrl}/players/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // 3. Dynamic Sets
    const sets = await db.set.findMany({ select: { slug: true, updatedAt: true } })
    const setRoutes = sets.map((s) => ({
        url: `${baseUrl}/sets/${s.slug}`,
        lastModified: s.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    // 4. Dynamic Cards (The Snowball)
    // For large datasets, this needs pagination or splitting into sitemap indexes.
    // For MVP/Demo, fetching all is fine (limit to 10k probably in real app).
    const cards = await db.card.findMany({
        take: 5000,
        select: { slug: true, updatedAt: true }
    })
    const cardRoutes = cards.map((c) => ({
        url: `${baseUrl}/cards/${c.slug}`,
        lastModified: c.updatedAt,
        changeFrequency: 'daily' as const,
        priority: 0.9,
    }))

    // 5. Dynamic Articles
    const articles = await getRecentArticles()
    const articleRoutes = articles.map((a) => ({
        url: `${baseUrl}/analysis/${a.slug}`,
        lastModified: a.publishedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [
        ...staticRoutes,
        ...playerRoutes,
        ...setRoutes,
        ...cardRoutes,
        ...articleRoutes
    ]
}
