export interface Player {
  id: string
  name: string
  slug: string
  position: string
  team?: string
  careerStats?: Record<string, any>
}

export interface Set {
  id: string
  name: string
  year: number
  brand: string
  description?: string
}

export interface Card {
  id: string
  slug: string
  number?: string
  description?: string
  imageUrl?: string
  fairValueScore?: number
  liquidityIndex?: number
  momentumScore?: number
  volatilityScore?: number
  player: Player
  set: Set
  gradedCards: GradedCard[]
}

export interface GradedCard {
  id: string
  grader: string
  grade: string
  population?: number
  card?: Card
  sales?: Sale[]
}

export interface Sale {
  id: string
  price: number
  date: string
  source: string
  url?: string
  lotNumber?: string
  auctionHouse?: string
}

export interface Listing {
  id: string
  title: string
  price: number
  currency: string
  source: string
  url: string
  imageUrl?: string
  condition?: string
  listedAt: string
}
