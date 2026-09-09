import { Link } from 'react-router-dom'
import { drinksIn } from '../data/cocktails'
import { sectionMeta, sectionOrder } from '../data/sections'
import { useBar } from '../context/bar'
import { makeability } from '../lib/matching'

export function DashboardPage() {
  const { stock } = useBar()

  return (
    <div className="page home">
      <header className="page-head">
        <p className="eyebrow">Bar Assistant</p>
        <h2>Що наливаємо</h2>
        <p className="lede">Чотири розділи меню. Обери категорію і відкрий рецепт.</p>
      </header>

      <section className="category-grid">
        {sectionOrder.map((section) => {
          const meta = sectionMeta[section]
          const drinks = drinksIn(section)
          const ready = drinks.filter((item) => makeability(item, stock) === 'ready').length
          return (
            <Link key={section} to={meta.path} className={`category-card category-${section}`}>
              <p className="eyebrow">{meta.hint}</p>
              <h3>{meta.title}</h3>
              <p className="category-count">
                {drinks.length} позицій
                {ready > 0 ? ` · ${ready} можна зараз` : ''}
              </p>
            </Link>
          )
        })}
      </section>
    </div>
  )
}
