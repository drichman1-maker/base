
"use client"

export interface PortfolioItem {
    id: string
    cardId: string
    slug: string
    title: string
    imageUrl: string
    dateAdded: number
}

const STORAGE_KEYS = {
    PORTFOLIO: "gradebase_portfolio",
    WATCHLIST: "gradebase_watchlist"
}

export const addToPortfolio = (item: Omit<PortfolioItem, "id" | "dateAdded">) => {
    if (typeof window === "undefined") return

    const current = getPortfolio()
    const newItem = {
        ...item,
        id: crypto.randomUUID(),
        dateAdded: Date.now()
    }

    localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify([...current, newItem]))
    return newItem
}

export const getPortfolio = (): PortfolioItem[] => {
    if (typeof window === "undefined") return []
    const raw = localStorage.getItem(STORAGE_KEYS.PORTFOLIO)
    return raw ? JSON.parse(raw) : []
}

export const addToWatchlist = (item: Omit<PortfolioItem, "id" | "dateAdded">) => {
    if (typeof window === "undefined") return

    const current = getWatchlist()
    if (current.some(i => i.cardId === item.cardId)) return // Dedupe

    const newItem = {
        ...item,
        id: crypto.randomUUID(),
        dateAdded: Date.now()
    }

    localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify([...current, newItem]))
    return newItem
}

export const getWatchlist = (): PortfolioItem[] => {
    if (typeof window === "undefined") return []
    const raw = localStorage.getItem(STORAGE_KEYS.WATCHLIST)
    return raw ? JSON.parse(raw) : []
}
