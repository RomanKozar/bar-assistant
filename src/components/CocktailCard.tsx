import { Link } from 'react-router-dom'
import { glassLabels } from '../data/labels'
import { sectionMeta } from '../data/sections'
import { drinkPhoto } from '../lib/photos'
import type { Cocktail } from '../types'

function shotMeta(cocktail: Cocktail) {
  const layers = new Set(
    cocktail.ingredients
      .map((line) => line.layer)
      .filter((layer): layer is 1 | 2 | 3 => layer === 1 || layer === 2 || layer === 3),
  ).size
  if (layers === 1) return '1 шар'
  return `${layers} шари`
}

type Props = {
  cocktail: Cocktail
}

export function CocktailCard({ cocktail }: Props) {
  const photo = drinkPhoto(cocktail)

  return (
    <Link to={`${sectionMeta[cocktail.section].path}/${cocktail.id}`} className="card">
      {photo ? (
        <div
          className={
            cocktail.section === 'alcoholic' || cocktail.section === 'coffee'
              ? 'card-photo portrait'
              : 'card-photo'
          }
        >
          <img src={photo} alt="" loading="lazy" decoding="async" />
        </div>
      ) : null}
      <div className="card-body">
        <h3>{cocktail.name}</h3>
        {cocktail.nameUk !== cocktail.name ? <p className="card-uk">{cocktail.nameUk}</p> : null}
        <p className="card-meta">
          {cocktail.section === 'shots'
            ? shotMeta(cocktail)
            : glassLabels[cocktail.glass]}
        </p>
      </div>
    </Link>
  )
}
