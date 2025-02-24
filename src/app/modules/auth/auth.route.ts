import { Router } from "express"
import { login, refreshToken } from "./auth.controller"
import validateRequest from "../../middlewares/validateRequest"
import {
  loginValidationSchema,
  refreshTokenValidationSchema,
} from "./auth.validation"

const router = Router()

router.post("/login", validateRequest(loginValidationSchema), login)
router.post(
  "/refresh-token",
  validateRequest(refreshTokenValidationSchema),
  refreshToken
)

export const AuthRoutes = router
