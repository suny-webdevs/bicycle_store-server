import { z } from "zod"
import { bicycleCategories } from "./bicycle.constant"

export const createBicycleValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    brand: z.string({ required_error: "Brand is required" }),
    price: z
      .number({ required_error: "Price is required" })
      .positive({ message: "Price must be positive number" }),
    category: z.enum([...bicycleCategories] as [string, ...string[]], {
      required_error: "Select a category",
    }),
    description: z.string({ required_error: "Description is required" }),
    quantity: z
      .number({ required_error: "Quantity is required" })
      .positive({ message: "Price must be positive number" }),
  }),
})

export const updateBicycleValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }).optional(),
    brand: z.string({ required_error: "Brand is required" }).optional(),
    price: z
      .number({ required_error: "Price is required" })
      .positive({ message: "Price must be positive number" })
      .optional(),
    category: z
      .enum([...bicycleCategories] as [string, ...string[]], {
        required_error: "Select a category",
      })
      .optional(),
    description: z
      .string({ required_error: "Description is required" })
      .optional(),
    quantity: z
      .number({ required_error: "Quantity is required" })
      .positive({ message: "Price must be positive number" })
      .optional(),
  }),
})
