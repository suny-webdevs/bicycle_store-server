import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { BicycleServices } from "./bicycle.service"
import httpStatus from "http-status"

export const createBicycle = catchAsync(async (req, res) => {
  const data = await BicycleServices.createBicycleToDB(req.body)
  sendResponse(res, httpStatus.CREATED, "Product successfully created", data)
})

export const getAllBicycles = catchAsync(async (req, res) => {
  const data = await BicycleServices.getAllBicyclesFromDB()
  sendResponse(res, httpStatus.OK, "Get all products successfully", data)
})

export const getSingleBicycle = catchAsync(async (req, res) => {
  const data = await BicycleServices.getSingleBicycleFromDB(
    req.params.bicycleId
  )
  sendResponse(res, httpStatus.OK, "Get product successfully", data)
})

export const updateBicycle = catchAsync(async (req, res) => {
  const data = await BicycleServices.updateBicycleInDB(
    req.params.bicycleId,
    req.body
  )
  sendResponse(res, httpStatus.OK, "Product successfully updated", data)
})

// export const deleteBicycle = catchAsync(async (req, res) => {})
