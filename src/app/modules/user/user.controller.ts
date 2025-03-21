import AppError from "../../errors/AppError"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { UserService } from "./user.service"
import httpStatus from "http-status"

export const createUser = catchAsync(async (req, res) => {
  const data = await UserService.createUserToDB(req.body)
  sendResponse(res, httpStatus.CREATED, "User successfully created", data)
})

export const getAllUsers = catchAsync(async (req, res) => {
  const data = await UserService.getAllUsersFromDB()
  sendResponse(res, httpStatus.OK, "Get all users successfully", data)
})

export const updateUser = catchAsync(async (req, res) => {
  const data = await UserService.updateUserFromDB(req.params.userId, req.body)
  sendResponse(res, httpStatus.OK, "User updated successfully", data)
})

export const deleteUser = catchAsync(async (req, res) => {
  const data = await UserService.deleteUserFromDB(req.params.userId)
  sendResponse(res, httpStatus.OK, "User deleted successfully", data)
})

export const getUserProfile = catchAsync(async (req, res) => {
  if (!req.user || !req.user.id || !req.user.email) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid user data")
  }
  const { id, role } = req.user
  const data = await UserService.getUserProfileFromDB(id, role)
  sendResponse(res, httpStatus.OK, "User profile get successfully", data)
})
