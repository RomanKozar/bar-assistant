import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { loadStock, saveStock } from '../lib/storage'
import type { StockMap } from '../types'
import { BarContext } from './bar'

export function BarProvider({ children }: { children: ReactNode }) {
  const [stock, setStock] = useState<StockMap>(() => loadStock())

  const update = useCallback((next: StockMap) => {
    setStock(next)
    saveStock(next)
  }, [])

  const toggleStock = useCallback(
    (ingredientId: string) => {
      update({ ...stock, [ingredientId]: !stock[ingredientId] })
    },
    [stock, update],
  )

  const value = useMemo(() => ({ stock, toggleStock }), [stock, toggleStock])

  return <BarContext.Provider value={value}>{children}</BarContext.Provider>
}
