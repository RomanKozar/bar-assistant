import { createContext, useContext } from 'react'
import type { StockMap } from '../types'

export type BarContextValue = {
  stock: StockMap
  toggleStock: (ingredientId: string) => void
}

export const BarContext = createContext<BarContextValue | null>(null)

export function useBar() {
  const ctx = useContext(BarContext)
  if (!ctx) throw new Error('useBar must be used inside BarProvider')
  return ctx
}
