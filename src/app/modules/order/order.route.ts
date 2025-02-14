import { Router } from "express"
import { createOrder, getAllOrders, verifyPayment } from "./order.controller"
import auth from "../../middlewares/auth"

const router = Router()

router.post("/create-order", auth("customer"), createOrder)
router.get("/", auth("admin", "customer"), getAllOrders)
router.get("/verify", auth("customer"), verifyPayment)

export const OrderRoutes = router
