import AppError from "../../errors/AppError"
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary"
import { Bicycle } from "./bicycle.model"
import { TBicycle } from "./bicycle.types"
import httpStatus from "http-status"

const createBicycleToDB = async (file: any, payload: TBicycle) => {
  const isExists = await Bicycle.findOne({ name: payload.name })
  if (isExists) {
    throw new AppError(httpStatus.CONFLICT, "Product name already exist")
  }

  if (file) {
    const imageName = (payload?.name).split(" ").join("_")
    const path = file?.path

    const { secure_url } = await sendImageToCloudinary(imageName, path)

    payload.image = secure_url as string
  }

  const data = await Bicycle.create(payload)
  return data
}

const getAllBicyclesFromDB = async () => {
  const data = await Bicycle.find()
  return data
}

const getSingleBicycleFromDB = async (id: string) => {
  const data = await Bicycle.findById(id)
  return data
}

const updateBicycleInDB = async (id: string, payload: Partial<TBicycle>) => {
  const data = await Bicycle.findByIdAndUpdate(id, payload, { new: true })
  return data
}

// const deleteBicycleFromDB = async (id: string) => {
//   const data = await Bicycle.findByIdAndUpdate(
//     id,
//     { isDeleted: true },
//     { new: true }
//   )
// }

export const BicycleServices = {
  createBicycleToDB,
  getAllBicyclesFromDB,
  getSingleBicycleFromDB,
  updateBicycleInDB,
  //   deleteBicycleFromDB,
}
