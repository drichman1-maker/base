// @ts-nocheck
import { db } from "@/lib/db"

export interface Article {
    slug: string
    title: string
    excerpt: string
    content: string
    publishedAt: string
    tags: string[]
    relatedCardId?: string
}

export async function getRecentArticles(): Promise<Article[]> {
    // In a real app, this would come from a CMS or DB
    // Here we generate them programmatically based on DB data

    const players = await db.player.findMany({ take: 3 })

    const articles: Article[] = [
        {
            slug: "state-of-the-market-2026",
            title: "The State of the Baseball Card Market in 2026",
            excerpt: "Why vintage liquidity is drying up while modern prospect speculation hits all-time highs.",
            content: `
## Market Overview

The baseball card market in 2026 is defined by a flight to quality. While base cards from the junk wax era remain stagnant, high-grade vintage examples are seeing record-breaking realized prices at Goldin and Heritage auctions.

### Key Trends

1. **Vintage Stability**: Pre-1970 Hall of Famers in PSA 7 or higher are outperforming the S&P 500 year-to-date.
2. **Prospect Volatility**: The "Bowman Chrome" cycle has shortened, with prospect prices peaking earlier in the dev cycle.
3. **Grading Arbitrage**: The spread between PSA 9 and PSA 10 premiums has widened to 4.5x on average for modern ultra-modern cards.

### What to Watch

Keep an eye on low-pop parallels from the mid-2000s. As millennials enter their peak earning years, nostalgia for this era is driving a quiet liquidity surge.
            `,
            publishedAt: new Date().toISOString(),
            tags: ["Market Trends", "Investing"]
        }
    ]

    // Generating dynamic articles for players
    for (const player of players) {
        articles.push({
            slug: `investing-in-${player.slug}-cards`,
            title: `Is it Time to Buy ${player.name}?`,
            excerpt: `Analyzing the investment thesis for ${player.name} based on recent sale velocity and fair value metrics.`,
            content: `
## ${player.name} Investment Analysis

**${player.name}** remains one of the most watched figures in the hobby. With recent performance metrics indicating a shift in collector sentiment, we breakdown the buy/sell case.

### Bull Case
*   Legacy status ensures eternal demand.
*   Low population counts on high-grade rookie cards.

### Bear Case
*   Recent auction results show a 5% softening in mid-grade copies.
            `,
            publishedAt: new Date(Date.now() - 86400000).toISOString(),
            tags: ["Player Analysis", "Buy/Sell"]
        })
    }

    return articles
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    const articles = await getRecentArticles()
    return articles.find(a => a.slug === slug) || null
}
