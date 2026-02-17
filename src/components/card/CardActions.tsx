
"use client"

import { Button } from "@/components/ui/button"
import { Heart, PlusCircle, Check } from "lucide-react"
import { addToPortfolio, addToWatchlist, PortfolioItem } from "@/lib/storage"
import { useState } from "react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface CardActionsProps {
    card: {
        id: string
        slug: string
        title: string
        imageUrl: string
    }
}

export function CardActions({ card }: CardActionsProps) {
    const [added, setAdded] = useState(false)
    const [watched, setWatched] = useState(false)

    const handleAdd = () => {
        addToPortfolio({
            cardId: card.id,
            slug: card.slug,
            title: card.title,
            imageUrl: card.imageUrl
        })
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    const handleWatch = () => {
        addToWatchlist({
            cardId: card.id,
            slug: card.slug,
            title: card.title,
            imageUrl: card.imageUrl
        })
        setWatched(true)
        setTimeout(() => setWatched(false), 2000)
    }

    return (
        <div className="flex gap-2 w-full sm:w-auto">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" onClick={handleWatch} className={watched ? "text-red-500 bg-red-500/10 border-red-500/20" : ""}>
                            <Heart className={`h-4 w-4 ${watched ? "fill-current" : ""}`} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Watch Card</TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <Button className="w-full sm:w-auto gap-2" onClick={handleAdd} disabled={added}>
                {added ? <Check className="h-4 w-4" /> : <PlusCircle className="h-4 w-4" />}
                {added ? "Added to Portfolio" : "Add to Portfolio"}
            </Button>
        </div>
    )
}
