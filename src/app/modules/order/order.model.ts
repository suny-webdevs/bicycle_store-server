import { model, Schema } from "mongoose"
import { TOrder } from "./order.type"

const orderSchema = new Schema<TOrder>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Customer ID is required"],
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Bicycle",
      required: [true, "Product ID is required"],
      unique: true,
    },
    quantity: { type: Number, required: [true, "Quantity is required"] },
    totalPrice: { type: Number, required: [true, "Total price is required"] },
  },
  { timestamps: true }
)

export const Order = model<TOrder>("Order", orderSchema)
