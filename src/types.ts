export type IngredientCategory =
  | 'spirit'
  | 'liqueur'
  | 'fortified'
  | 'wine'
  | 'bitter'
  | 'fresh'
  | 'syrup'
  | 'mixer'
  | 'garnish'

export type Method = 'shake' | 'stir' | 'build' | 'blend' | 'throw' | 'layer' | 'shot'

export type Glass =
  | 'shot'
  | 'rocks'
  | 'coupe'
  | 'martini'
  | 'highball'
  | 'collins'
  | 'wine'
  | 'flute'
  | 'margarita'
  | 'hurricane'
  | 'nick-and-nora'
  | 'espresso'
  | 'cappuccino'
  | 'latte'
  | 'mug'

export type DrinkSection = 'shots' | 'alcoholic' | 'virgin' | 'coffee'

export type Unit = 'ml' | 'dash' | 'pcs' | 'tsp' | 'top' | 'barspoon' | 'drop' | 'pinch' | 'g'

export type ShotLayer = 1 | 2 | 3 | 'top'

export type Ingredient = {
  id: string
  name: string
  category: IngredientCategory
}

export type RecipeLine = {
  ingredientId: string
  amount: number
  unit: Unit
  optional?: boolean
  note?: string
  layer?: ShotLayer
}

export type Cocktail = {
  id: string
  name: string
  nameUk: string
  section: DrinkSection
  glass: Glass
  method: Method
  ice: string
  garnish: string
  ingredients: RecipeLine[]
  steps: string[]
  volumeMl?: number
  note?: string
  effect?: string
}

export type Makeability = 'ready' | 'almost' | 'missing'

export type StockMap = Record<string, boolean>
