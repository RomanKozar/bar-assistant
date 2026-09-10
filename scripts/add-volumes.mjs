import fs from 'node:fs'

const volumes = {
  // Алкогольні
  'aperol-spritz': 250,
  'french-75': 150,
  'jager-sparkling': 250,
  mimosa: 150,
  negroni: 200,
  margarita: 200,
  'pina-colada': 300,
  'blue-lagoon': 300,
  'gin-tonic': 300,
  'whiskey-cola': 300,
  'mojito-vodka': 300,
  'mojito-gin': 300,
  'mojito-jager': 300,
  'jager-orange': 300,
  'jager-tonic': 300,
  'jager-apple': 300,
  'black-night': 200,
  'jager-sour': 250,
  'gin-fizz': 300,
  // Шоти
  'syniy-polyarnyk': 50,
  'yeger-bomber': 50,
  'sribna-kulia': 50,
  'lisovyi-pryvyd': 50,
  meduza: 50,
  'b-52': 45,
  hiroshima: 50,
  'zelenyi-meksykanets': 50,
  'bilyi-oksamyt': 50,
  // Б/А
  'mojito-zero': 300,
  'lemonade-orange': 300,
  'lemonade-citrus': 300,
  'lemonade-seabuckthorn': 300,
  'lemonade-ginger': 300,
  'lemonade-raspberry': 300,
  'lemonade-berry': 300,
  milkshake: 300,
  'pina-colada-zero': 300,
  'pomegranate-boom': 300,
}

const path = 'src/data/cocktails.ts'
let source = fs.readFileSync(path, 'utf8')

for (const [id, volumeMl] of Object.entries(volumes)) {
  const idPattern = `id: '${id}'`
  const idx = source.indexOf(idPattern)
  if (idx === -1) {
    console.warn('Missing id:', id)
    continue
  }

  const slice = source.slice(idx, idx + 800)
  if (slice.includes('volumeMl:')) {
    console.log('Skip (already set):', id)
    continue
  }

  const garnishMatch = slice.match(/garnish: '[^']*',/)
  if (!garnishMatch) {
    console.warn('No garnish for:', id)
    continue
  }

  const insertAt = idx + slice.indexOf(garnishMatch[0]) + garnishMatch[0].length
  source = `${source.slice(0, insertAt)}\n    volumeMl: ${volumeMl},${source.slice(insertAt)}`
  console.log('Added', id, volumeMl)
}

fs.writeFileSync(path, source)
