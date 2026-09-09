import type { Cocktail, DrinkSection } from '../types'

const folderBySection: Record<DrinkSection, string> = {
  shots: '/Images/Shots',
  alcoholic: '/Images/Alcoholic-Cocktails',
  virgin: '/Images/Non-alcoholic-cocktails',
  coffee: '/Images/Coffee',
}

const sectionsWithPhotos: DrinkSection[] = ['shots', 'alcoholic', 'virgin']

export function drinkPhoto(drink: Cocktail): string | undefined {
  if (!sectionsWithPhotos.includes(drink.section)) return undefined
  return `${folderBySection[drink.section]}/${drink.id}.webp`
}
