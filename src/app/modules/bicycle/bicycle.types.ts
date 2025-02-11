import { TBicycleCategory } from "./bicycle.constant"

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
