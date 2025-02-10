import { Router } from "express"
import { login } from "./auth.controller"
import validateRequest from "../../middlewares/validateRequest"
import { loginValidationSchema } from "./auth.validation"

const router = Router()

router.post("/login", validateRequest(loginValidationSchema), login)

export const AuthRoutes = router
