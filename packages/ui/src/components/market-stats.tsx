interface MarketStatsProps {
  fairValueScore?: number
  liquidityIndex?: number
  momentumScore?: number
  volatilityScore?: number
}

export function MarketStats({
  fairValueScore,
  liquidityIndex,
  momentumScore,
  volatilityScore,
}: MarketStatsProps) {
  const getScoreColor = (score: number | undefined) => {
    if (!score) return "text-gray-400"
    if (score >= 70) return "text-green-600"
    if (score >= 40) return "text-yellow-600"
    return "text-red-600"
  }

  const formatScore = (score: number | undefined) => {
    if (!score) return "N/A"
    return score.toFixed(1)
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
      <div>
        <p className="text-xs text-muted-foreground">Fair Value</p>
        <p className={`text-lg font-semibold ${getScoreColor(fairValueScore)}`}>
          {formatScore(fairValueScore)}
        </p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Liquidity</p>
        <p className={`text-lg font-semibold ${getScoreColor(liquidityIndex)}`}>
          {formatScore(liquidityIndex)}
        </p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Momentum</p>
        <p className={`text-lg font-semibold ${momentumScore && momentumScore > 0 ? "text-green-600" : momentumScore && momentumScore < 0 ? "text-red-600" : "text-gray-400"}`}>
          {formatScore(momentumScore)}
        </p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Volatility</p>
        <p className={`text-lg font-semibold ${getScoreColor(volatilityScore)}`}>
          {formatScore(volatilityScore)}
        </p>
      </div>
    </div>
  )
}
