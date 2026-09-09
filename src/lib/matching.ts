import type { Cocktail, Makeability, RecipeLine, StockMap } from '../types'

export function requiredLines(cocktail: Cocktail): RecipeLine[] {
  return cocktail.ingredients.filter((line) => !line.optional)
}

export function missingLines(cocktail: Cocktail, stock: StockMap): RecipeLine[] {
  return requiredLines(cocktail).filter((line) => !stock[line.ingredientId])
}

export function makeability(cocktail: Cocktail, stock: StockMap): Makeability {
  const missing = missingLines(cocktail, stock).length
  if (missing === 0) return 'ready'
  if (missing === 1) return 'almost'
  return 'missing'
}

export function formatAmount(amount: number, unit: string): string {
  if (unit === 'top') return 'доверху'
  if (unit === 'g' || unit === 'г') return `${amount} г`
  if (unit === 'pinch' || unit === 'дрібка') {
    return amount === 1 ? '1 дрібка' : `${amount} дрібки`
  }
  if (unit === 'drop' || unit === 'кр.') {
    if (amount === 1) return '1 крапля'
    if (amount >= 2 && amount <= 4) return `${amount} краплі`
    return `${amount} крапель`
  }
  return `${amount} ${unit}`
}

export function isIceLine(line: RecipeLine): boolean {
  return line.ingredientId === 'ice' || line.ingredientId === 'crushed-ice'
}

export function formatLineAmount(line: RecipeLine, unitLabel: string): string {
  if (isIceLine(line)) return line.note ?? 'доверху'
  return formatAmount(line.amount, unitLabel)
}
