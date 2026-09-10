import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const dir = path.resolve('public/Images/Coffee')

const renameMap = {
  'espreso.webp': 'espresso.webp',
  'americano.webp': 'americano.webp',
  'americano_moloko.webp': 'americano-milk.webp',
  'kapychino.webp': 'cappuccino.webp',
  'late.webp': 'latte.webp',
  'espreso-z-molokom.webp': 'espresso-milk.webp',
  'ajs-late.webp': 'ice-latte.webp',
  'kakao.webp': 'cocoa.webp',
  'chai-v-asor.webp': 'tea-assorted.webp',
  'kraftovuy.webp': 'craft-tea.webp',
  'chai-v-zavarnuc.webp': 'tea-teapot.webp',
}

const placeholders = {
  'decaf-espresso.webp': 'espresso.webp',
  'decaf-americano.webp': 'americano.webp',
  'decaf-cappuccino.webp': 'cappuccino.webp',
  'decaf-latte.webp': 'latte.webp',
}

async function optimize(src, dest) {
  const before = fs.statSync(src).size
  const meta = await sharp(src).metadata()

  await sharp(src)
    .rotate()
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 76, effort: 6 })
    .toFile(dest)

  const after = fs.statSync(dest).size
  console.log(
    `${path.basename(src)} ${meta.width}x${meta.height} ${(before / 1024).toFixed(0)}KB -> ${path.basename(dest)} ${(after / 1024).toFixed(0)}KB`,
  )
}

const tempDir = path.join(dir, '.tmp-coffee')
fs.mkdirSync(tempDir, { recursive: true })

for (const [file, destName] of Object.entries(renameMap)) {
  const src = path.join(dir, file)
  if (!fs.existsSync(src)) {
    console.warn('Missing source:', file)
    continue
  }

  const dest = path.join(tempDir, destName)
  await optimize(src, dest)
}

for (const [destName, sourceName] of Object.entries(placeholders)) {
  const src = path.join(tempDir, sourceName)
  const dest = path.join(tempDir, destName)
  if (!fs.existsSync(src)) {
    console.warn('Missing placeholder source:', sourceName)
    continue
  }
  await optimize(src, dest)
  console.log(`placeholder ${sourceName} -> ${destName}`)
}

for (const file of fs.readdirSync(dir)) {
  if (file === '.tmp-coffee' || file === '.gitkeep') continue
  fs.unlinkSync(path.join(dir, file))
}

for (const file of fs.readdirSync(tempDir)) {
  fs.renameSync(path.join(tempDir, file), path.join(dir, file))
}

fs.rmdirSync(tempDir)

console.log('Done. Files:', fs.readdirSync(dir).filter((f) => f.endsWith('.webp')).sort())
