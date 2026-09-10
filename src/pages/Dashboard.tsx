import { Link } from 'react-router-dom'
import { drinksIn } from '../data/cocktails'
import { sectionMeta, sectionOrder } from '../data/sections'

export function DashboardPage() {
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
          const countLabel =
            section === 'shots'
              ? `${drinks.length} шотів`
              : `${drinks.length} позицій`
          return (
            <Link key={section} to={meta.path} className={`category-card category-${section}`}>
              <p className="eyebrow">{meta.hint}</p>
              <h3>{meta.title}</h3>
              <p className="category-count">{countLabel}</p>
            </Link>
          )
        })}
      </section>
    </div>
  )
}
