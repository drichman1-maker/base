interface Sale {
  id: string
  price: number
  date: Date
  source: string
  auctionHouse?: string | null
}

interface SoldListingsProps {
  sales: Sale[]
}

export function SoldListings({ sales }: SoldListingsProps) {
  if (sales.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No recent sales
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="space-y-2">
      <h3 className="font-semibold mb-3">Recent Sales</h3>
      {sales.map((sale) => (
        <div
          key={sale.id}
          className="flex items-center justify-between p-3 bg-muted rounded"
        >
          <div>
            <p className="font-medium">{formatPrice(sale.price)}</p>
            <p className="text-sm text-muted-foreground">{sale.source}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">{formatDate(sale.date)}</p>
            {sale.auctionHouse && (
              <p className="text-xs text-muted-foreground">{sale.auctionHouse}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
