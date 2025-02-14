import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { OrderServices } from "./order.service"
import httpStatus from "http-status"

export const createOrder = catchAsync(async (req, res) => {
  const data = await OrderServices.createOrderIntoDB(
    req.user,
    req.body,
    req.ip!
  )
  sendResponse(res, httpStatus.CREATED, "Order created successfully", data)
})

export const getAllOrders = catchAsync(async (req, res) => {
  const data = await OrderServices.getAllOrders()
  sendResponse(res, httpStatus.OK, "Get all orders successfully", data)
})

export const verifyPayment = catchAsync(async (req, res) => {
  const data = await OrderServices.verifyPayment(req.query.order_id as string)
  sendResponse(res, httpStatus.OK, "Payment verified", data)
})
