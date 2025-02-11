import { model, Schema } from "mongoose"
import { TBicycle } from "./bicycle.types"
import { bicycleCategories } from "./bicycle.constant"

const bicycleSchema = new Schema<TBicycle>(
  {
    image: { type: String },
    name: { type: String, required: [true, "Name is required"] },
    brand: { type: String, required: [true, "Brand is required"] },
    price: { type: Number, required: [true, "Price is required"] },
    category: {
      type: String,
      enum: {
        values: bicycleCategories,
        message: "{VALUE} is not a valid category",
      },
      required: [true, "Category is required"],
    },
    description: { type: String, required: [true, "Description is required"] },
    quantity: { type: Number, required: [true, "Quantity is required"] },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export const Bicycle = model<TBicycle>("Bicycle", bicycleSchema)
