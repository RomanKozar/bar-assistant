import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const coffeeDir = path.resolve('public/Images/Coffee')

const placeholders = {
  'ristretto.webp': 'espresso.webp',
  'lungo.webp': 'espresso.webp',
  'doppio.webp': 'espresso.webp',
  'macchiato.webp': 'espresso-milk.webp',
  'flat-white.webp': 'cappuccino.webp',
  'espresso-tonic.webp': 'ice-latte.webp',
}

async function copyOptimized(src, dest) {
  await sharp(src)
    .rotate()
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 76, effort: 6 })
    .toFile(dest)
  console.log(`${path.basename(src)} -> ${path.basename(dest)}`)
}

for (const [destName, sourceName] of Object.entries(placeholders)) {
  const src = path.join(coffeeDir, sourceName)
  const dest = path.join(coffeeDir, destName)
  await copyOptimized(src, dest)
}

const bumbleSrc = path.resolve('public/Images/Non-alcoholic-cocktails/lemonade-orange.webp')
if (fs.existsSync(bumbleSrc)) {
  await copyOptimized(bumbleSrc, path.join(coffeeDir, 'bumble.webp'))
} else {
  await copyOptimized(path.join(coffeeDir, 'ice-latte.webp'), path.join(coffeeDir, 'bumble.webp'))
}

console.log('Done')
