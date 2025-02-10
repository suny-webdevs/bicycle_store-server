import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { UserService } from "./user.service"

export const createUser = catchAsync(async (req, res) => {
  const data = await UserService.createUserToDB(req.body)
  sendResponse(res, "User created", data)
})

export const getAllUsers = catchAsync(async (req, res) => {
  const data = await UserService.getAllUsersFromDB()
  sendResponse(res, "User created", data)
})

export const getSingleUser = catchAsync(async (req, res) => {
  const data = await UserService.getSingleUserFromDB(req.params.userId)
  sendResponse(res, "User created", data)
})

export const updateUser = catchAsync(async (req, res) => {
  const data = await UserService.updateUserFromDB(req.params.userId, req.body)
  sendResponse(res, "User created", data)
})

export const deleteUser = catchAsync(async (req, res) => {
  const data = await UserService.deleteUserFromDB(req.params.userId)
  sendResponse(res, "User created", data)
})
