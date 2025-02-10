import { Router } from "express"
import validateRequest from "../../middlewares/validateRequest"
import {
  createBicycleValidationSchema,
  updateBicycleValidationSchema,
} from "./bicycle.validation"
import {
  createBicycle,
  getAllBicycles,
  getSingleBicycle,
  updateBicycle,
} from "./bicycle.controller"
import auth from "../../middlewares/auth"

const router = Router()

router.post(
  "/create-bicycle",
  auth("admin"),
  validateRequest(createBicycleValidationSchema),
  createBicycle
)
router.get("/", getAllBicycles)
router.get("/:bicycleId", getSingleBicycle)
router.patch(
  "/update-bicycle/:bicycleId",
  auth("admin"),
  validateRequest(updateBicycleValidationSchema),
  updateBicycle
)

export const BicycleRoutes = router
