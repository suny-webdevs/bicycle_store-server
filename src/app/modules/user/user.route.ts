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
  getUserProfile,
  updateUser,
} from "./user.controller"
import auth from "../../middlewares/auth"
import { USER_ROLE } from "./user.constant"

const router = Router()

router.post(
  "/create-user",
  validateRequest(createUserValidationSchema),
  createUser
)
router.get("/", auth("admin"), getAllUsers)
router.patch(
  "/update-user/:userId",
  auth("customer"),
  validateRequest(updateUserValidationSchema),
  updateUser
)
router.delete("/delete-user/:userId", auth("customer", "admin"), deleteUser)

router.get(
  "/profile",
  auth(USER_ROLE.admin, USER_ROLE.customer),
  getUserProfile
)

export const UserRoutes = router
