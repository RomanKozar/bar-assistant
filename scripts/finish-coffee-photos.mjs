import fs from 'node:fs'
import path from 'node:path'

const dir = path.resolve('public/Images/Coffee')
const tempDir = path.join(dir, '.tmp-coffee')

const legacyFiles = [
  'ajs-late.webp',
  'americano_moloko.webp',
  'chai-v-asor.webp',
  'chai-v-zavarnuc.webp',
  'espreso-z-molokom.webp',
  'espreso.webp',
  'kakao.webp',
  'kapychino.webp',
  'kraftovuy.webp',
  'late.webp',
]

if (!fs.existsSync(tempDir)) {
  console.error('Missing temp folder — run optimize-coffee.mjs first')
  process.exit(1)
}

for (const file of fs.readdirSync(tempDir)) {
  const src = path.join(tempDir, file)
  const dest = path.join(dir, file)
  fs.copyFileSync(src, dest)
  console.log('Installed', file)
}

for (const file of legacyFiles) {
  const legacy = path.join(dir, file)
  if (fs.existsSync(legacy)) {
    fs.unlinkSync(legacy)
    console.log('Removed legacy', file)
  }
}

fs.rmSync(tempDir, { recursive: true, force: true })
console.log(
  'Coffee photos:',
  fs.readdirSync(dir).filter((f) => f.endsWith('.webp')).sort(),
)
