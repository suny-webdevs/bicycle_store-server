export type TBicycleCategory =
  | "Road"
  | "Mountain"
  | "Electric"
  | "Hybrid"
  | "Cruiser"
  | "BMX"
  | "Folding"
  | "Recumbent"

export type TBicycle = {
  image?: string
  name: string
  brand: string
  price: number
  category: TBicycleCategory
  description: string
  quantity: number
  inStock: boolean
}
