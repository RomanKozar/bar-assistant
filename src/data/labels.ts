import type { DrinkSection, Glass, IngredientCategory, Method, ShotLayer, Unit } from '../types'

export const methodLabels: Record<Method, string> = {
  shake: 'Шейк',
  stir: 'Стір',
  build: 'Білд',
  blend: 'Бленд',
  throw: 'Троу',
  layer: 'Шари',
  shot: 'Шот',
}

export const glassLabels: Record<Glass, string> = {
  shot: 'Шот',
  rocks: 'Рокс',
  coupe: 'Куп',
  martini: 'Мартіні',
  highball: 'Хайбол',
  collins: 'Колінз',
  wine: 'Великий винний келих',
  flute: 'Флюте',
  margarita: 'Келих для Маргарити',
  hurricane: 'Харрікейн',
  'nick-and-nora': 'Nick & Nora',
  espresso: 'Чашка еспресо',
  cappuccino: 'Чашка капучино',
  latte: 'Склянка лате',
  mug: 'Чашка',
}

export const sectionLabels: Record<DrinkSection, string> = {
  shots: 'Шоти',
  alcoholic: 'Алкогольні',
  virgin: 'Безалкогольні',
  coffee: 'Кава',
}

export const layerLabels: Record<ShotLayer, string> = {
  1: 'Шар 1 · на дно',
  2: 'Шар 2 · по ложці',
  3: 'Шар 3 · по ложці',
  top: 'Спецефект',
}

export const categoryLabels: Record<IngredientCategory, string> = {
  spirit: 'Міцний алкоголь',
  liqueur: 'Лікери',
  fortified: 'Кріплені вина',
  wine: 'Вино',
  bitter: 'Біттери',
  fresh: 'Фреш / свіже',
  syrup: 'Сиропи',
  mixer: 'Міксери',
  garnish: 'Гарнір',
}

export const unitLabels: Record<Unit, string> = {
  ml: 'мл',
  dash: 'dash',
  pcs: 'шт',
  tsp: 'ч. л.',
  top: 'top',
  barspoon: 'б/л',
  drop: 'кр.',
  pinch: 'дрібка',
  g: 'г',
}

export const categoryOrder: IngredientCategory[] = [
  'spirit',
  'liqueur',
  'fortified',
  'wine',
  'bitter',
  'syrup',
  'fresh',
  'mixer',
  'garnish',
]
