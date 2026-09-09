import type { DrinkSection } from '../types'

export const sectionMeta: Record<
  DrinkSection,
  { title: string; hint: string; path: string }
> = {
  shots: {
    title: 'Шоти',
    hint: 'Короткі, міцні, швидко',
    path: '/shots',
  },
  alcoholic: {
    title: 'Алкогольні коктейлі',
    hint: 'Класика і сервіс у келиху',
    path: '/alcoholic',
  },
  virgin: {
    title: 'Безалкогольні коктейлі',
    hint: 'Лимонади, мохіто, молочні',
    path: '/virgin',
  },
  coffee: {
    title: 'Кава',
    hint: 'Еспресо, капучино, лате',
    path: '/coffee',
  },
}

export const sectionOrder: DrinkSection[] = ['shots', 'alcoholic', 'virgin', 'coffee']

export function isDrinkSection(value: string | undefined): value is DrinkSection {
  return (
    value === 'shots' ||
    value === 'alcoholic' ||
    value === 'virgin' ||
    value === 'coffee'
  )
}
