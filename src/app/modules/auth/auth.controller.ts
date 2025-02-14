import config from "../../config"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { AuthServices } from "./auth.service"
import httpStatus from "http-status"

export const login = catchAsync(async (req, res) => {
  const data = await AuthServices.loginUser(req.body)
  const { token, refreshToken, changePassword } = data

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  })

  sendResponse(res, httpStatus.OK, "User logged in successfully", {
    token,
    changePassword,
  })
})

export const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body

  const data = await AuthServices.changePassword(req.user, passwordData)
  sendResponse(res, httpStatus.OK, "Password changed", data)
})

export const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies
  const data = await AuthServices.refreshToken(refreshToken)

  sendResponse(res, httpStatus.OK, "Token refreshed", data)
})
