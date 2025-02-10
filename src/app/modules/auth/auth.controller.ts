import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { AuthServices } from "./auth.service"
import httpStatus from "http-status"

export const login = catchAsync(async (req, res) => {
  const data = await AuthServices.loginUser(req.body)
  sendResponse(res, httpStatus.OK, "User logged in", data)
})
