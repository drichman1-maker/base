import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding Slugger database...')

  // Create players
  const players = await Promise.all([
    prisma.player.create({
      data: {
        name: 'Mickey Mantle',
        slug: 'mickey-mantle',
        position: 'OF',
        team: 'New York Yankees',
        careerStats: {
          hits: 2415,
          homeRuns: 536,
          battingAverage: 0.298,
          years: '1951-1968',
        },
      },
    }),
    prisma.player.create({
      data: {
        name: 'Derek Jeter',
        slug: 'derek-jeter',
        position: 'SS',
        team: 'New York Yankees',
        careerStats: {
          hits: 3465,
          homeRuns: 260,
          battingAverage: 0.310,
          years: '1995-2014',
        },
      },
    }),
    prisma.player.create({
      data: {
        name: 'Hank Aaron',
        slug: 'hank-aaron',
        position: 'OF',
        team: 'Milwaukee/Atlanta Braves',
        careerStats: {
          hits: 3771,
          homeRuns: 755,
          battingAverage: 0.305,
          years: '1954-1976',
        },
      },
    }),
    prisma.player.create({
      data: {
        name: 'Mike Trout',
        slug: 'mike-trout',
        position: 'OF',
        team: 'Los Angeles Angels',
        careerStats: {
          hits: 1500,
          homeRuns: 350,
          battingAverage: 0.303,
          years: '2011-Present',
        },
      },
    }),
    prisma.player.create({
      data: {
        name: 'Babe Ruth',
        slug: 'babe-ruth',
        position: 'OF/P',
        team: 'New York Yankees',
        careerStats: {
          hits: 2873,
          homeRuns: 714,
          battingAverage: 0.342,
          years: '1914-1935',
        },
      },
    }),
    prisma.player.create({
      data: {
        name: 'Ken Griffey Jr.',
        slug: 'ken-griffey-jr',
        position: 'OF',
        team: 'Seattle Mariners',
        careerStats: {
          hits: 2781,
          homeRuns: 630,
          battingAverage: 0.284,
          years: '1989-2010',
        },
      },
    }),
    prisma.player.create({
      data: {
        name: 'Jackie Robinson',
        slug: 'jackie-robinson',
        position: '2B',
        team: 'Brooklyn Dodgers',
        careerStats: {
          hits: 1518,
          homeRuns: 137,
          battingAverage: 0.311,
          years: '1947-1956',
        },
      },
    }),
    prisma.player.create({
      data: {
        name: 'Ted Williams',
        slug: 'ted-williams',
        position: 'OF',
        team: 'Boston Red Sox',
        careerStats: {
          hits: 2654,
          homeRuns: 521,
          battingAverage: 0.344,
          years: '1939-1960',
        },
      },
    }),
    prisma.player.create({
      data: {
        name: 'Willie Mays',
        slug: 'willie-mays',
        position: 'OF',
        team: 'New York/San Francisco Giants',
        careerStats: {
          hits: 3283,
          homeRuns: 660,
          battingAverage: 0.302,
          years: '1951-1973',
        },
      },
    }),
    prisma.player.create({
      data: {
        name: 'Shohei Ohtani',
        slug: 'shohei-ohtani',
        position: 'DH/P',
        team: 'Los Angeles Dodgers',
        careerStats: {
          hits: 900,
          homeRuns: 200,
          battingAverage: 0.280,
          years: '2018-Present',
        },
      },
    }),
  ])

  console.log(`Created ${players.length} players`)

  // Create sets
  const sets = await Promise.all([
    prisma.set.create({
      data: {
        name: 'Topps',
        year: 1952,
        brand: 'Topps',
        description: 'Classic Topps baseball set',
      },
    }),
    prisma.set.create({
      data: {
        name: 'Bowman',
        year: 1951,
        brand: 'Bowman',
        description: 'Bowman baseball set',
      },
    }),
    prisma.set.create({
      data: {
        name: 'Topps',
        year: 1954,
        brand: 'Topps',
        description: 'Topps baseball set',
      },
    }),
    prisma.set.create({
      data: {
        name: 'Topps',
        year: 1955,
        brand: 'Topps',
        description: 'Topps baseball set',
      },
    }),
    prisma.set.create({
      data: {
        name: 'Goudey',
        year: 1933,
        brand: 'Goudey',
        description: 'Classic Goudey baseball set',
      },
    }),
    prisma.set.create({
      data: {
        name: 'Upper Deck',
        year: 1989,
        brand: 'Upper Deck',
        description: 'Upper Deck baseball debut',
      },
    }),
    prisma.set.create({
      data: {
        name: 'Topps',
        year: 1993,
        brand: 'Topps',
        description: 'Topps baseball set',
      },
    }),
    prisma.set.create({
      data: {
        name: 'SP',
        year: 1993,
        brand: 'Upper Deck',
        description: 'SP Premium baseball',
      },
    }),
    prisma.set.create({
      data: {
        name: 'Topps Update',
        year: 2011,
        brand: 'Topps',
        description: 'Topps Update series',
      },
    }),
    prisma.set.create({
      data: {
        name: 'Bowman',
        year: 2018,
        brand: 'Bowman',
        description: 'Bowman baseball prospects',
      },
    }),
    prisma.set.create({
      data: {
        name: 'Topps Update',
        year: 2018,
        brand: 'Topps',
        description: 'Topps Update series',
      },
    }),
    prisma.set.create({
      data: {
        name: 'Leaf',
        year: 1948,
        brand: 'Leaf',
        description: 'Leaf baseball set',
      },
    }),
  ])

  console.log(`Created ${sets.length} sets`)

  // Find players and sets for card creation
  const mantle = players.find(p => p.slug === 'mickey-mantle')!
  const jeter = players.find(p => p.slug === 'derek-jeter')!
  const aaron = players.find(p => p.slug === 'hank-aaron')!
  const trout = players.find(p => p.slug === 'mike-trout')!
  const ruth = players.find(p => p.slug === 'babe-ruth')!
  const griffey = players.find(p => p.slug === 'ken-griffey-jr')!
  const robinson = players.find(p => p.slug === 'jackie-robinson')!
  const williams = players.find(p => p.slug === 'ted-williams')!
  const mays = players.find(p => p.slug === 'willie-mays')!
  const ohtani = players.find(p => p.slug === 'shohei-ohtani')!

  const set1952Topps = sets.find(s => s.year === 1952 && s.brand === 'Topps')!
  const set1951Bowman = sets.find(s => s.year === 1951 && s.brand === 'Bowman')!
  const set1954Topps = sets.find(s => s.year === 1954 && s.brand === 'Topps')!
  const set1955Topps = sets.find(s => s.year === 1955 && s.brand === 'Topps')!
  const set1933Goudey = sets.find(s => s.year === 1933 && s.brand === 'Goudey')!
  const set1989UD = sets.find(s => s.year === 1989 && s.brand === 'Upper Deck')!
  const set1993Topps = sets.find(s => s.year === 1993 && s.brand === 'Topps')!
  const set1993SP = sets.find(s => s.year === 1993 && s.brand === 'Upper Deck' && s.name === 'SP')!
  const set2011Update = sets.find(s => s.year === 2011 && s.name === 'Topps Update')!
  const set2018Bowman = sets.find(s => s.year === 2018 && s.brand === 'Bowman')!
  const set2018Update = sets.find(s => s.year === 2018 && s.name === 'Topps Update')!
  const set1948Leaf = sets.find(s => s.year === 1948 && s.brand === 'Leaf')!

  // Create cards with graded variants
  const cards = await Promise.all([
    // Mickey Mantle cards
    createCard(mantle.id, set1952Topps.id, '311', 'mickey-mantle-1952-topps-311', [
      { grader: 'PSA', grade: '5', population: 2500 },
      { grader: 'PSA', grade: '7', population: 1800 },
      { grader: 'SGC', grade: '4', population: 900 },
    ]),
    createCard(mantle.id, set1951Bowman.id, '253', 'mickey-mantle-1951-bowman-253', [
      { grader: 'PSA', grade: '6', population: 1200 },
    ]),
    
    // Derek Jeter cards
    createCard(jeter.id, set1993SP.id, '279', 'derek-jeter-1993-sp-279', [
      { grader: 'PSA', grade: '9', population: 3500 },
      { grader: 'BGS', grade: '9', population: 2100 },
    ]),
    createCard(jeter.id, set1993Topps.id, '98', 'derek-jeter-1993-topps-98', [
      { grader: 'PSA', grade: '10', population: 4200 },
    ]),
    
    // Hank Aaron cards
    createCard(aaron.id, set1954Topps.id, '128', 'hank-aaron-1954-topps-128', [
      { grader: 'PSA', grade: '6', population: 850 },
      { grader: 'PSA', grade: '7', population: 620 },
    ]),
    createCard(aaron.id, set1955Topps.id, '47', 'hank-aaron-1955-topps-47', [
      { grader: 'PSA', grade: '7', population: 780 },
    ]),
    
    // Mike Trout cards
    createCard(trout.id, set2011Update.id, 'US175', 'mike-trout-2011-topps-update-us175', [
      { grader: 'PSA', grade: '10', population: 8900 },
      { grader: 'PSA', grade: '9', population: 5600 },
    ]),
    
    // Babe Ruth cards
    createCard(ruth.id, set1933Goudey.id, '53', 'babe-ruth-1933-goudey-53', [
      { grader: 'PSA', grade: '4', population: 450 },
      { grader: 'PSA', grade: '5', population: 280 },
    ]),
    createCard(ruth.id, set1933Goudey.id, '144', 'babe-ruth-1933-goudey-144', [
      { grader: 'PSA', grade: '3', population: 320 },
    ]),
    
    // Ken Griffey Jr cards
    createCard(griffey.id, set1989UD.id, '1', 'ken-griffey-jr-1989-upper-deck-1', [
      { grader: 'PSA', grade: '10', population: 12000 },
      { grader: 'PSA', grade: '9', population: 8500 },
    ]),
    
    // Jackie Robinson
    createCard(robinson.id, set1948Leaf.id, '79', 'jackie-robinson-1948-leaf-79', [
      { grader: 'PSA', grade: '4', population: 380 },
      { grader: 'PSA', grade: '5', population: 220 },
    ]),
    
    // Ted Williams
    createCard(williams.id, set1954Topps.id, '250', 'ted-williams-1954-topps-250', [
      { grader: 'PSA', grade: '7', population: 450 },
      { grader: 'PSA', grade: '6', population: 620 },
    ]),
    
    // Willie Mays
    createCard(mays.id, set1952Topps.id, '261', 'willie-mays-1952-topps-261', [
      { grader: 'PSA', grade: '5', population: 520 },
      { grader: 'PSA', grade: '6', population: 380 },
    ]),
    
    // Shohei Ohtani
    createCard(ohtani.id, set2018Update.id, 'US1', 'shohei-ohtani-2018-topps-update-us1', [
      { grader: 'PSA', grade: '10', population: 6500 },
      { grader: 'PSA', grade: '9', population: 4200 },
    ]),
    createCard(ohtani.id, set2018Bowman.id, '49', 'shohei-ohtani-2018-bowman-49', [
      { grader: 'PSA', grade: '10', population: 5800 },
    ]),
  ])

  console.log(`Created ${cards.length} cards with graded variants`)

  // Create some sample sales data
  await createSampleSales()

  console.log('✅ Seeding complete!')
}

async function createCard(
  playerId: string,
  setId: string,
  number: string,
  slug: string,
  grades: { grader: string; grade: string; population: number }[]
) {
  const card = await prisma.card.create({
    data: {
      playerId,
      setId,
      number,
      slug,
      description: `${slug.split('-').slice(0, -3).join(' ')} ${number}`,
      fairValueScore: Math.random() * 100,
      liquidityIndex: Math.random() * 10,
      momentumScore: (Math.random() - 0.5) * 20,
      volatilityScore: Math.random() * 30,
      gradedCards: {
        create: grades.map(g => ({
          grader: g.grader,
          grade: g.grade,
          population: g.population,
        })),
      },
    },
    include: {
      gradedCards: true,
    },
  })
  return card
}

async function createSampleSales() {
  const gradedCards = await prisma.gradedCard.findMany()
  
  // Create 3-5 sales per graded card with realistic prices
  for (const gradedCard of gradedCards.slice(0, 10)) {
    const basePrice = getBasePrice(gradedCard.grader, gradedCard.grade)
    
    await prisma.sale.createMany({
      data: [
        {
          gradedCardId: gradedCard.id,
          price: basePrice * (0.9 + Math.random() * 0.2),
          date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
          source: 'eBay',
        },
        {
          gradedCardId: gradedCard.id,
          price: basePrice * (0.85 + Math.random() * 0.3),
          date: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000),
          source: 'PWCC',
        },
        {
          gradedCardId: gradedCard.id,
          price: basePrice * (0.95 + Math.random() * 0.15),
          date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
          source: 'Heritage',
        },
      ],
    })
  }
  
  console.log(`Created sample sales for ${Math.min(10, gradedCards.length)} graded cards`)
}

function getBasePrice(grader: string, grade: string): number {
  const gradeMultiplier: Record<string, number> = {
    '10': 10,
    '9.5': 8,
    '9': 6,
    '8': 4,
    '7': 3,
    '6': 2.5,
    '5': 2,
    '4': 1.5,
    '3': 1.2,
  }
  
  const graderMultiplier: Record<string, number> = {
    'PSA': 1,
    'BGS': 0.95,
    'SGC': 0.9,
  }
  
  const basePrice = 1000 // Base price for a common card
  return basePrice * (gradeMultiplier[grade] || 1) * (graderMultiplier[grader] || 0.8)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
