import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const shotsDir = path.resolve('public/Images/Shots')

const renameMap = {
  'B-52.jpg': 'b-52.webp',
  'Єгер Бомбер.jpg': 'yeger-bomber.webp',
  'Білий оксамит.jpg': 'bilyi-oksamyt.webp',
  'Зелений мексиканець.jpg': 'zelenyi-meksykanets.webp',
  'Лісовий привид.jpg': 'lisovyi-pryvyd.webp',
  'Медуза.jpg': 'meduza.webp',
  'Синній полярник.jpg': 'syniy-polyarnyk.webp',
  'Срібна куля.jpg': 'sribna-kulia.webp',
  'Хіросіма.jpg': 'hiroshima.webp',
}

const files = fs.readdirSync(shotsDir)

for (const file of files) {
  const destName = renameMap[file]
  if (!destName) continue

  const src = path.join(shotsDir, file)
  const dest = path.join(shotsDir, destName)
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
