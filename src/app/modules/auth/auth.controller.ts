import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { AuthServices } from "./auth.service"

export const login = catchAsync(async (req, res) => {
  const data = await AuthServices.loginUser(req.body)
  sendResponse(res, "User logged in", data)
})
