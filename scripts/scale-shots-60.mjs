import fs from 'node:fs'

const path = 'src/data/cocktails.ts'
let source = fs.readFileSync(path, 'utf8')

const shots = [
  {
    id: 'syniy-polyarnyk',
    amounts: [12, 18, 30],
    steps: [
      'На дно шота налий Блю Кюрасао — 12 мл.',
      'По ложці налий лимонний фреш — 18 мл. Фреш без м’якоті.',
      'По ложці налий горілку — 30 мл.',
    ],
  },
  {
    id: 'yeger-bomber',
    amounts: [12, 18, 30],
    steps: [
      'На дно — імбирний сироп 12 мл.',
      'По ложці — лимонний фреш 18 мл.',
      'По ложці — Єгермейстер 30 мл.',
    ],
  },
  {
    id: 'sribna-kulia',
    amounts: [30, 30],
    steps: [
      'На дно — кавовий лікер 30 мл.',
      'По ложці — джин 30 мл.',
      'Зверху поклади часточку лимона.',
    ],
  },
  {
    id: 'lisovyi-pryvyd',
    amounts: [18, 12, 30],
    steps: [
      'На дно — зелений м’ятний лікер 18 мл.',
      'По ложці — фреш лайма або лимона 12 мл.',
      'По ложці — Єгермейстер 30 мл.',
    ],
  },
  {
    id: 'meduza',
    amounts: [30, 24, 3, 3],
    steps: [
      'На дно — кокосовий лікер 30 мл.',
      'По ложці — текіла 24 мл.',
      'Зверху капни по 3 мл Блю Кюрасао та Бейлісу.',
    ],
  },
  {
    id: 'b-52',
    amounts: [20, 20, 20],
    steps: [
      'На дно — кавовий лікер 20 мл.',
      'По ложці — Бейліс 20 мл.',
      'По ложці — апельсиновий лікер 20 мл. Шари рівні.',
    ],
  },
  {
    id: 'hiroshima',
    amounts: [24, 18, 18],
    steps: [
      'На дно — текіла 24 мл.',
      'По ложці — Бейліс 18 мл.',
      'По ложці — абсент 18 мл.',
      'У центр капни 3 краплі гренадину.',
    ],
  },
  {
    id: 'zelenyi-meksykanets',
    amounts: [24, 12, 24],
    steps: [
      'На дно — диневий лікер 24 мл.',
      'По ложці — лимонний фреш 12 мл. Фреш ідеально чистий.',
      'По ложці — текіла 24 мл.',
    ],
  },
  {
    id: 'bilyi-oksamyt',
    amounts: [36, 24],
    steps: [
      'На дно — самбука 36 мл.',
      'По ложці — Бейліс 24 мл.',
      'У центр капни 1 краплю гренадину.',
    ],
  },
]

for (const shot of shots) {
  const start = source.indexOf(`id: '${shot.id}'`)
  if (start === -1) {
    console.warn('Missing', shot.id)
    continue
  }

  let end = source.indexOf("\n  },", start)
  if (end === -1) end = source.length
  let block = source.slice(start, end)

  block = block.replace(/volumeMl: \d+,/, 'volumeMl: 60,')

  let amountIdx = 0
  block = block.replace(/amount: \d+, unit: 'ml'/g, (match) => {
    const amount = shot.amounts[amountIdx++]
    return `amount: ${amount}, unit: 'ml'`
  })

  const stepsMatch = block.match(/steps: \[([\s\S]*?)\],/)
  if (stepsMatch) {
    const stepsBlock = shot.steps.map((step) => `      '${step}',`).join('\n')
    block = block.replace(stepsMatch[0], `steps: [\n${stepsBlock}\n    ],`)
  }

  source = source.slice(0, start) + block + source.slice(end)
  console.log('Updated', shot.id)
}

fs.writeFileSync(path, source)
