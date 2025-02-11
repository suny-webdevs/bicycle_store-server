import { Types } from "mongoose"

export type TOrder = {
  customerId: Types.ObjectId
  productId: Types.ObjectId
  quantity: number
  totalPrice: number
}
