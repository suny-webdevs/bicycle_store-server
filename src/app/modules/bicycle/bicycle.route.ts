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
import { upload } from "../../utils/sendImageToCloudinary"
import textToJson from "../../middlewares/textToJson"

const router = Router()

router.post(
  "/create-bicycle",
  auth("admin"),
  upload.single("file"),
  textToJson(),
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
