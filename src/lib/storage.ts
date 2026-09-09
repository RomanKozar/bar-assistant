import type { StockMap } from '../types'

const STORAGE_KEY = 'bar-assistant.stock.v1'

const defaultIds = [
  'bourbon',
  'gin',
  'vodka',
  'white-rum',
  'blanco',
  'campari',
  'aperol',
  'cointreau',
  'sweet-vermouth',
  'prosecco',
  'angostura',
  'lime-juice',
  'lemon-juice',
  'simple-syrup',
  'soda',
  'tonic',
  'mint',
  'kahlua',
  'baileys',
  'sambuca',
  'jagermeister',
  'grenadine',
  'orange-juice',
  'ginger-beer',
  'blue-curacao',
  'ginger-syrup',
  'mint-liqueur',
  'coconut-liqueur',
  'orange-liqueur',
  'melon-liqueur',
  'absinthe',
  'tequila',
  'citrus-fresh',
]

export function defaultStock(): StockMap {
  return Object.fromEntries(defaultIds.map((id) => [id, true]))
}

export function loadStock(): StockMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultStock()
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return defaultStock()
    return { ...defaultStock(), ...(parsed as StockMap) }
  } catch {
    return defaultStock()
  }
}

export function saveStock(stock: StockMap): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stock))
}
