import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const dir = path.resolve('public/Images/Alcoholic-Cocktails')

const renameMap = {
  'Aperol Spritz.jpg': 'aperol-spritz.webp',
  'Black Night.jpg': 'black-night.webp',
  'French 75.jpg': 'french-75.webp',
  'Jager Apple.jpg': 'jager-apple.webp',
  'Jager Orange.jpg': 'jager-orange.webp',
  'Jager Sour.jpg': 'jager-sour.webp',
  'Jager Sparkling.jpg': 'jager-sparkling.webp',
  'Jager tonic.jpg': 'jager-tonic.webp',
  'Margarita.jpg': 'margarita.webp',
  'Mimosa.jpg': 'mimosa.webp',
  'Negroni.jpg': 'negroni.webp',
  'Pina Colada.jpg': 'pina-colada.webp',
  'Блакитна лагуна.jpg': 'blue-lagoon.webp',
  'Віскі кола.jpg': 'whiskey-cola.webp',
  'Джин тонік.jpg': 'gin-tonic.webp',
  'Джин Фіз.jpg': 'gin-fizz.webp',
  'Мохіто + єгермейстер.jpg': 'mojito-jager.webp',
  'Мохіто + горілка.jpg': 'mojito-vodka.webp',
  'Мохіто + джин.jpg': 'mojito-gin.webp',
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
