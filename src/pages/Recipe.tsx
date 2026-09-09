import { Link, Navigate, useParams } from 'react-router-dom'
import { cocktailById } from '../data/cocktails'
import { ingredientById } from '../data/ingredients'
import { glassLabels, layerLabels, sectionLabels, unitLabels } from '../data/labels'
import { isDrinkSection, sectionMeta } from '../data/sections'
import { formatLineAmount, isIceLine } from '../lib/matching'
import { drinkPhoto } from '../lib/photos'

export function RecipePage() {
  const { section, id } = useParams()
  const cocktail = id ? cocktailById[id] : undefined

  if (!cocktail) {
    return (
      <div className="page">
        <p className="empty">Рецепт не знайдено.</p>
        <Link to="/" className="btn">
          На головну
        </Link>
      </div>
    )
  }

  if (!isDrinkSection(section) || cocktail.section !== section) {
    return <Navigate to={`${sectionMeta[cocktail.section].path}/${cocktail.id}`} replace />
  }

  const photo = drinkPhoto(cocktail)
  const backTo = sectionMeta[cocktail.section]

  return (
    <div className="page recipe">
      <Link to={backTo.path} className="back">
        ← {backTo.title}
      </Link>

      <header className="page-head">
        <p className="eyebrow">
          {cocktail.nameUk !== cocktail.name
            ? cocktail.nameUk
            : sectionLabels[cocktail.section]}
        </p>
        <h2>{cocktail.name}</h2>
        <p className="recipe-glass">{glassLabels[cocktail.glass]}</p>
      </header>

      {photo ? (
        <figure className="recipe-photo">
          <img src={photo} alt={cocktail.name} />
        </figure>
      ) : null}

      <section className="panel">
        <h3>{cocktail.section === 'shots' ? 'Шари' : 'Інгредієнти'}</h3>
        <ul className="lines">
          {cocktail.ingredients.map((line, index) => {
            const ingredient = ingredientById[line.ingredientId]
            return (
              <li key={`${line.ingredientId}-${line.layer ?? index}-${line.note ?? ''}`}>
                <span className="line-name">
                  {line.layer ? (
                    <span className="layer-tag">{layerLabels[line.layer]}</span>
                  ) : null}
                  {ingredient?.name ?? line.ingredientId}
                  {!isIceLine(line) && line.optional ? <em> опційно</em> : null}
                  {!isIceLine(line) && line.note ? <em> · {line.note}</em> : null}
                </span>
                <span className="line-amount">
                  {formatLineAmount(line, unitLabels[line.unit])}
                </span>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="panel">
        <h3>Приготування</h3>
        <ol className="steps">
          {cocktail.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        {cocktail.note ? <p className="note">{cocktail.note}</p> : null}
      </section>
    </div>
  )
}
