
// @ts-nocheck

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "file:./dev.db",
        },
    },
})

async function main() {
    console.log('Start seeding ...')

    // 1. Create Players
    const players = [
        {
            name: 'Mickey Mantle',
            slug: 'mickey-mantle',
            bio: 'The Commerce Comet. A switch-hitting center fielder who played his entire 18-year Major League Baseball career for the New York Yankees.',
        },
        {
            name: 'Shohei Ohtani',
            slug: 'shohei-ohtani',
            bio: 'Japanese professional baseball pitcher and designated hitter. Widely considered one of the greatest two-way players in baseball history.',
        },
        {
            name: 'Mike Trout',
            slug: 'mike-trout',
            bio: 'American professional baseball center fielder for the Los Angeles Angels. A three-time AL MVP and nine-time Silver Slugger Award winner.',
        },
        {
            name: 'Derek Jeter',
            slug: 'derek-jeter',
            bio: 'The Captain. A five-time World Series champion and 14-time All-Star shortstop for the New York Yankees.',
        },
    ]

    for (const p of players) {
        await prisma.player.upsert({
            where: { slug: p.slug },
            update: {},
            create: p,
        })
    }

    // 2. Create Sets
    const sets = [
        { year: 1952, name: 'Topps', slug: '1952-topps', description: 'The most iconic post-war baseball card set.' },
        { year: 2011, name: 'Topps Update', slug: '2011-topps-update', description: 'Home to the legendary Mike Trout rookie card.' },
        { year: 2018, name: 'Topps Chrome', slug: '2018-topps-chrome', description: 'Features the key Shohei Ohtani rookie cards.' },
        { year: 1993, name: 'SP', slug: '1993-sp', description: 'The premier Derek Jeter rookie card set.' },
    ]

    for (const s of sets) {
        await prisma.set.upsert({
            where: { slug: s.slug },
            update: {},
            create: s,
        })
    }

    // 3. Create Cards (Canonical Entities)
    // We need to fetch the player and set IDs first
    const mantle = await prisma.player.findUnique({ where: { slug: 'mickey-mantle' } })
    const topps52 = await prisma.set.findUnique({ where: { slug: '1952-topps' } })

    const trout = await prisma.player.findUnique({ where: { slug: 'mike-trout' } })
    const topps11 = await prisma.set.findUnique({ where: { slug: '2011-topps-update' } })

    const ohtani = await prisma.player.findUnique({ where: { slug: 'shohei-ohtani' } })
    const chrome18 = await prisma.set.findUnique({ where: { slug: '2018-topps-chrome' } })

    const jeter = await prisma.player.findUnique({ where: { slug: 'derek-jeter' } })
    const sp93 = await prisma.set.findUnique({ where: { slug: '1993-sp' } })


    const cards = [
        {
            playerId: mantle.id,
            setId: topps52.id,
            cardNumber: '311',
            slug: '1952-topps-mickey-mantle-311',
            fairValueScore: 125000,
            liquidityIndex: 85,
            momentumScore: 72,
            volatilityScore: 45,
        },
        {
            playerId: trout.id,
            setId: topps11.id,
            cardNumber: 'US175',
            slug: '2011-topps-update-mike-trout-us175',
            fairValueScore: 1850,
            liquidityIndex: 92,
            momentumScore: 65,
            volatilityScore: 30,
        },
        {
            playerId: ohtani.id,
            setId: chrome18.id,
            cardNumber: '150',
            slug: '2018-topps-chrome-shohei-ohtani-150',
            fairValueScore: 450,
            liquidityIndex: 98,
            momentumScore: 95,
            volatilityScore: 60,
        },
        {
            playerId: jeter.id,
            setId: sp93.id,
            cardNumber: '279',
            slug: '1993-sp-derek-jeter-279',
            fairValueScore: 3500, // PSA 9 ballpark
            liquidityIndex: 88,
            momentumScore: 55,
            volatilityScore: 25,
        },
    ]

    for (const c of cards) {
        // Upsert using the unique constraint on (setId, playerId, cardNumber)
        // Wait, prisma create many or upsert requires where clause on unique field
        // We can use the slug since it's unique
        const { playerId, setId, ...rest } = c
        await prisma.card.upsert({
            where: { slug: c.slug },
            update: {},
            create: {
                player: { connect: { id: playerId } },
                set: { connect: { id: setId } },
                ...rest
            }
        })
    }

    // 4. Create Graded Cards & Listings (The Snowball)
    // Let's attach some graded cards to the Mantle card
    const mantleCard = await prisma.card.findUnique({ where: { slug: '1952-topps-mickey-mantle-311' } })

    const grades = [
        { company: 'PSA', grade: '10', pop: 3, value: 12600000 },
        { company: 'PSA', grade: '9', pop: 6, value: 2880000 },
        { company: 'PSA', grade: '8', pop: 35, value: 500000 },
        { company: 'PSA', grade: '5', pop: 500, value: 85000 },
        { company: 'SGC', grade: '9.5', pop: 1, value: 9500000 },
        { company: 'BGS', grade: '9.5', pop: 0, value: 0 }, // Hypothetical
    ]

    for (const g of grades) {
        const gc = await prisma.gradedCard.upsert({
            where: {
                cardId_gradingCompany_grade: {
                    cardId: mantleCard.id,
                    gradingCompany: g.company,
                    grade: g.grade,
                }
            },
            update: {},
            create: {
                cardId: mantleCard.id,
                gradingCompany: g.company,
                grade: g.grade,
                population: g.pop,
                marketValue: g.value,
            }
        })

        // Add a listing
        if (g.value > 0) {
            await prisma.listing.create({
                data: {
                    gradedCardId: gc.id,
                    price: g.value * (1 + (Math.random() * 0.1 - 0.05)), // +/- 5%
                    type: 'auction',
                    url: 'https://ebay.com/itm/mock',
                    source: 'eBay',
                    title: `${g.company} ${g.grade} 1952 Topps Mickey Mantle`,
                    sellerRating: 99.5,
                }
            })
        }
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
