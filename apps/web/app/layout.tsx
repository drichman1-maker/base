import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@slugger/ui/styles.css"
import "./globals.css"
import { Navigation } from "@slugger/ui/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Slugger - Graded Baseball Card Tracker",
  description: "Track prices and values of graded baseball cards. PSA, BGS, SGC pricing data.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
