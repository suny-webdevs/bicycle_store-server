import { model, Schema } from "mongoose"
import { TBicycle } from "./bicycle.types"

const bicycleSchema = new Schema<TBicycle>(
  {
    name: { type: String, required: [true, "Name is required"] },
    brand: { type: String, required: [true, "Brand is required"] },
    price: { type: Number, required: [true, "Price is required"] },
    category: { type: String, required: [true, "Category is required"] },
    description: { type: String, required: [true, "Description is required"] },
    quantity: { type: Number, required: [true, "Quantity is required"] },
    inStock: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const Bicycle = model<TBicycle>("Bicycle", bicycleSchema)
