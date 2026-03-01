export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Slugger
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track prices and values of graded baseball cards.
            PSA, BGS, SGC pricing data for collectors and investors.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <a 
              href="/cards"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Browse Cards
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Track Prices</h3>
            <p className="text-muted-foreground mt-2">
              Monitor historical sales data from eBay, PWCC, Heritage, and more.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Market Intelligence</h3>
            <p className="text-muted-foreground mt-2">
              Fair value scores, liquidity index, and momentum tracking.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Graded Cards Only</h3>
            <p className="text-muted-foreground mt-2">
              Focused on PSA, BGS, and SGC graded cards with population reports.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
