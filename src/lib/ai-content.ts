// @ts-nocheck
import { Card, Player, Set, GradedCard } from "@prisma/client"

interface ExtendedCard extends Card {
    player: Player
    set: Set
    fairValueScore?: number | null
    liquidityIndex?: number | null
}

export function generateInvestmentAnalysis(card: ExtendedCard): string {
    const { player, set, fairValueScore, liquidityIndex } = card

    const score = fairValueScore ?? 0
    const liquidity = liquidityIndex ?? 0

    let sentiment = "Neutral"
    if (score > 1000 && liquidity > 50) sentiment = "Strong Buy"
    else if (score > 5000 && liquidity < 20) sentiment = "Long-term Hold"
    else if (liquidity > 90) sentiment = "High Velocity Trading"

    return `
### AI Investment Outlook: ${sentiment}

The **${set.year} ${set.name} ${player.name} #${card.cardNumber}** represents a strictly monitored asset within the ${set.name} index. 
With a **Fair Value Score of $${score.toLocaleString()}**, this card aligns with ${score > 1000 ? 'premium' : 'entry-level'} portfolio allocation strategies.

**Liquidity Analysis:**
Current market velocity is rated at **${liquidity}/100**, indicating ${liquidity > 80 ? 'extremely high' : liquidity > 50 ? 'moderate' : 'low'} turnover. ${liquidity > 80 ? 'Investors can expect rapid exits at market price.' : 'Expect longer hold times for optimal realization.'}

**Collector Intelligence:**
${player.name} remains a key figure in the ${player.bio ? 'hobby' : 'market'}. This specific issue from the ${set.year} set is often targeted by ${score > 10000 ? 'institutional' : 'retail'} capital flows.
  `.trim()
}

export function generateSeoDescription(card: ExtendedCard): string {
    return `Buy ${card.set.year} ${card.set.name} ${card.player.name} #${card.cardNumber} graded cards. Check fair value prices, PSA 10 population reports, and historical sales data on GradeBase.`
}
