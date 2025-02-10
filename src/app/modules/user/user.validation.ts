import { z } from "zod"

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Full Name is required" }),
    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .toLowerCase()
      .regex(new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"), {
        message: "Invalid email address",
      }),
    phone: z
      .string({ required_error: "Phone is required" })
      .min(11, { message: "Phone must be 11 characters" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be 6 characters" }),
    image: z.string().optional(),
    address: z.string({ required_error: "Address is required" }),
  }),
})

export const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .regex(new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"), {
        message: "Invalid email address",
      })
      .optional(),
    phone: z.string().min(11).optional(),
    password: z.string().min(6).optional(),
    image: z.string().optional(),
    address: z.string().optional(),
  }),
})
