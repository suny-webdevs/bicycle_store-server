import { Router } from "express"
import { UserRoutes } from "../modules/user/user.route"
import { AuthRoutes } from "../modules/auth/auth.route"
import { BicycleRoutes } from "../modules/bicycle/bicycle.route"

const router = Router()

const moduleRoutes = [
  { path: "/auth", route: AuthRoutes },
  { path: "/users", route: UserRoutes },
  { path: "/bicycles", route: BicycleRoutes },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
