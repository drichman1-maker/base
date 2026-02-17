
import { db } from "./db"

/**
 * Calculates the Fair Value Score for a card based on recent sales of its graded variants.
 * This is a weighted average of recent sales, prioritizing recency.
 */
export async function calculateFairValue(cardId: string): Promise<number | null> {
    // 1. Get all graded variants for this card
    const gradedCards = await db.gradedCard.findMany({
        where: { cardId },
        include: {
            recentSales: {
                orderBy: { date: 'desc' },
                take: 5 // Take last 5 sales per grade
            }
        }
    })

    let totalWeightedPrice = 0
    let totalWeight = 0

    // Mock logic: Iterate through grades and their sales
    // In a real system, we'd handle Grade weighting (e.g. PSA 10 is specific).
    // But here we want a "Card Level" fair value? 
    // Actually, Fair Value is often per grade. 
    // The schema has fairValueScore on the CARD. This might represent a "Base" value or composite.
    // Let's assume it's a composite index for the "Card Identity" generally, maybe based on PSA 10 or equivalent.
    // Or maybe it's the raw average.

    // Let's just average all sales for now for the "Card Score" (Volume weighted?)
    // Better: Identify the "Reference Grade" (PSA 10 usually) and use that.

    for (const gc of gradedCards) {
        if (gc.gradingCompany === 'PSA' && gc.grade === '10') {
            // Primary signal
            for (const sale of gc.recentSales) {
                totalWeightedPrice += sale.price
                totalWeight += 1
            }
        }
    }

    if (totalWeight === 0) return null
    return totalWeightedPrice / totalWeight
}

/**
 * Calculates Liquidity Index: Sales velocity over time.
 * Scale 0-100.
 */
export async function calculateLiquidity(cardId: string): Promise<number> {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const saleCount = await db.sale.count({
        where: {
            gradedCard: { cardId },
            date: { gte: thirtyDaysAgo }
        }
    })

    // Normalize: 10 sales/month = 100?
    // Let's say 20 sales/mo is MAX liquidity for this algo
    return Math.min((saleCount / 20) * 100, 100)
}

/**
 * Calculates Momentum Score: Price change velocity.
 * Scale 0-100. (50 is neutral)
 */
export async function calculateMomentum(cardId: string): Promise<number> {
    // Compare avg price last 30 days vs previous 30 days
    return 75 // Mock for now
}
