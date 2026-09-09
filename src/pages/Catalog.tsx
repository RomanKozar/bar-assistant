import { useMemo, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { CocktailCard } from '../components/CocktailCard'
import { drinksIn } from '../data/cocktails'
import { isDrinkSection, sectionMeta } from '../data/sections'

export function CatalogPage() {
  const { section } = useParams()
  const [query, setQuery] = useState('')

  const drinks = useMemo(
    () => (isDrinkSection(section) ? drinksIn(section) : []),
    [section],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return drinks.filter((cocktail) => {
      return (
        !q ||
        cocktail.name.toLowerCase().includes(q) ||
        cocktail.nameUk.toLowerCase().includes(q)
      )
    })
  }, [drinks, query])

  if (!isDrinkSection(section)) {
    return <Navigate to="/" replace />
  }

  const meta = sectionMeta[section]

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Меню</p>
        <h2>{meta.title}</h2>
        <p className="lede">{meta.hint}</p>
      </header>

      <input
        className="search"
        type="search"
        placeholder="Назва напою…"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      {filtered.length === 0 ? (
        <p className="empty">
          {drinks.length === 0 && !query.trim()
            ? 'Позиції в цій категорії ще не додані.'
            : 'Нічого не знайдено в цій категорії.'}
        </p>
      ) : (
        <div className="grid">
          {filtered.map((cocktail) => (
            <CocktailCard key={cocktail.id} cocktail={cocktail} />
          ))}
        </div>
      )}
    </div>
  )
}
