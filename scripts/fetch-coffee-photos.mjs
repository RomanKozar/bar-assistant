import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const outDir = path.resolve('public/Images/Coffee')

// Unsplash License — free for commercial use: https://unsplash.com/license
const sources = {
  'ristretto.webp': 'https://images.unsplash.com/photo-1766912262471-73a659cc3c0d?w=1200&q=85',
  'lungo.webp': 'https://images.unsplash.com/photo-1769264963664-36eed2f7eb4d?w=1200&q=85',
  'doppio.webp': 'https://images.unsplash.com/photo-1769264963569-164863a19d74?w=1200&q=85',
  'macchiato.webp': 'https://images.pexels.com/photos/6638846/pexels-photo-6638846.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'flat-white.webp': 'https://images.pexels.com/photos/2956954/pexels-photo-2956954.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'bumble.webp': 'https://images.pexels.com/photos/16416071/pexels-photo-16416071.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'espresso-tonic.webp': 'https://images.unsplash.com/photo-1710000856791-41c20b4670af?w=1200&q=85',
}

fs.mkdirSync(outDir, { recursive: true })

for (const [fileName, url] of Object.entries(sources)) {
  const tmp = path.join(outDir, `.tmp-${fileName}`)
  const dest = path.join(outDir, fileName)

  const res = await fetch(url, {
    headers: { 'User-Agent': 'bar-assistant/1.0 (local asset setup)' },
  })
  if (!res.ok) {
    throw new Error(`Failed ${fileName}: ${res.status} ${url}`)
  }

  const buffer = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(tmp, buffer)

  await sharp(tmp)
    .rotate()
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 76, effort: 6 })
    .toFile(dest)

  fs.unlinkSync(tmp)
  const kb = (fs.statSync(dest).size / 1024).toFixed(0)
  console.log(`${fileName} <- ${url.split('?')[0]} (${kb} KB)`)
}

console.log('Done')
