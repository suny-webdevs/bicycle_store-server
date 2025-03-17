import { Router } from "express"
import validateRequest from "../../middlewares/validateRequest"
import {
  createUserValidationSchema,
  updateUserValidationSchema,
} from "./user.validation"
import {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  getUserProfile,
  updateUser,
} from "./user.controller"
import auth from "../../middlewares/auth"

const router = Router()

router.post(
  "/create-user",
  validateRequest(createUserValidationSchema),
  createUser
)
router.get("/", auth("admin"), getAllUsers)
router.get("/:email", auth("admin", "customer"), getUserProfile)
router.get("/:userId", auth("admin"), getSingleUser)
router.patch(
  "/update-user/:userId",
  auth("customer"),
  validateRequest(updateUserValidationSchema),
  updateUser
)
router.delete("/delete-user/:userId", auth("customer", "admin"), deleteUser)

export const UserRoutes = router
