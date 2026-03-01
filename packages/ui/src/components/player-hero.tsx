interface Player {
  id: string
  name: string
  position: string
  team?: string | null
  careerStats?: Record<string, any> | null
}

interface PlayerHeroProps {
  player: Player
}

export function PlayerHero({ player }: PlayerHeroProps) {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-8 rounded-lg">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold mb-2">{player.name}</h1>
        <div className="flex items-center gap-4 text-blue-100">
          <span className="text-lg">{player.position}</span>
          {player.team && (
            <>
              <span>•</span>
              <span>{player.team}</span>
            </>
          )}
        </div>
        
        {player.careerStats && (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {player.careerStats.hits && (
              <div>
                <p className="text-2xl font-bold">{player.careerStats.hits.toLocaleString()}</p>
                <p className="text-sm text-blue-200">Career Hits</p>
              </div>
            )}
            {player.careerStats.homeRuns && (
              <div>
                <p className="text-2xl font-bold">{player.careerStats.homeRuns}</p>
                <p className="text-sm text-blue-200">Home Runs</p>
              </div>
            )}
            {player.careerStats.battingAverage && (
              <div>
                <p className="text-2xl font-bold">.{player.careerStats.battingAverage.toString().slice(2)}</p>
                <p className="text-sm text-blue-200">Batting Avg</p>
              </div>
            )}
            {player.careerStats.years && (
              <div>
                <p className="text-2xl font-bold">{player.careerStats.years}</p>
                <p className="text-sm text-blue-200">Career</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
