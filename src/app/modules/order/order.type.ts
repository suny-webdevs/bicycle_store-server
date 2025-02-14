import { Types } from "mongoose"

export type TProducts = {
  productId: Types.ObjectId
  quantity: number
}[]

export type TOrder = {
  customerId: Types.ObjectId
  products: TProducts
  totalPrice: number
  status: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled"
  transaction: {
    id?: string
    transactionStatus?: string
    bank_status?: string
    sp_code?: string
    sp_message?: string
    method?: string
    date_time?: string
  }
  createdAt?: string
  updatedAt?: string
}

export type TProductsPayload = {
  products: TProducts
}
