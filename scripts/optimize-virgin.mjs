import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const dir = path.resolve('public/Images/Non-alcoholic-cocktails')

const renameMap = {
  'Гранатовий бум.jpg': 'pomegranate-boom.webp',
  'Лимонад імбирний.jpg': 'lemonade-ginger.webp',
  'Лимонад апельсиновий.jpg': 'lemonade-orange.webp',
  'Лимонад малиновий.jpg': 'lemonade-raspberry.webp',
  'Лимонад обліпиховий.jpg': 'lemonade-seabuckthorn.webp',
  'Лимонад цитрусовий.jpg': 'lemonade-citrus.webp',
  'Лимонад ягода мікс.jpg': 'lemonade-berry.webp',
  'Молочний коктейль.jpg': 'milkshake.webp',
  'Мохіто Б-А.jpg': 'mojito-zero.webp',
  'Піна Колада Б-А.jpg': 'pina-colada-zero.webp',
}

for (const file of fs.readdirSync(dir)) {
  const destName = renameMap[file]
  if (!destName) {
    if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
      console.warn('Unmapped file:', file)
    }
    continue
  }

  const src = path.join(dir, file)
  const dest = path.join(dir, destName)
  const before = fs.statSync(src).size
  const meta = await sharp(src).metadata()

  await sharp(src)
    .rotate()
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 76, effort: 6 })
    .toFile(dest)

  const after = fs.statSync(dest).size
  console.log(
    `${file} ${meta.width}x${meta.height} ${(before / 1024).toFixed(0)}KB -> ${destName} ${(after / 1024).toFixed(0)}KB`,
  )
  fs.unlinkSync(src)
}
