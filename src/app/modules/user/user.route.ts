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
  updateUser,
} from "./user.controller"

const router = Router()

router.post(
  "/create-user",
  validateRequest(createUserValidationSchema),
  createUser
)
router.get("/users", getAllUsers)
router.get("/users/:userId", getSingleUser)
router.patch(
  "/users/update-user/:userId",
  validateRequest(updateUserValidationSchema),
  updateUser
)
router.delete("/users/delete-user/:userId", deleteUser)

export const UserRoutes = router
