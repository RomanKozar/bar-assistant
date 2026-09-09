import { useBar } from '../context/bar'
import { ingredients } from '../data/ingredients'
import { categoryLabels, categoryOrder } from '../data/labels'

export function InventoryPage() {
  const { stock, toggleStock } = useBar()
  const inStock = ingredients.filter((item) => stock[item.id]).length

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Станція</p>
        <h2>Склад бару</h2>
        <p className="lede">
          Познач, що реально стоїть на полиці. Від цього рахується меню «що змішати».
          Зараз у наявності {inStock} з {ingredients.length}.
        </p>
      </header>

      {categoryOrder.map((category) => {
        const items = ingredients.filter((item) => item.category === category)
        if (items.length === 0) return null
        return (
          <section key={category} className="panel">
            <h3>{categoryLabels[category]}</h3>
            <div className="chips">
              {items.map((item) => {
                const on = Boolean(stock[item.id])
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={on ? 'chip on' : 'chip'}
                    onClick={() => toggleStock(item.id)}
                    aria-pressed={on}
                  >
                    {item.name}
                  </button>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
