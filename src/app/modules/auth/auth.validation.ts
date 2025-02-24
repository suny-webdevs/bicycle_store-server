import { z } from "zod"

export const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .toLowerCase(),
    password: z
      .string({ required_error: "Email is required" })
      .min(6, { message: "Password must have 6 characters" }),
  }),
})

export const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: "Refresh token is required" }),
  }),
})
