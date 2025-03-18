import { JwtPayload } from "jsonwebtoken"
import AppError from "../../errors/AppError"
import { User } from "./user.model"
import { TUser } from "./user.type"
import httpStatus from "http-status"

const createUserToDB = async (payload: TUser) => {
  const isExists = await User.findOne({ email: payload.email })

  if (isExists) {
    throw new AppError(httpStatus.CONFLICT, "User already exists!")
  }

  const userData = { ...payload }

  userData.role = "customer"

  const data = await User.create(userData)
  return data
}

const getAllUsersFromDB = async () => {
  const data = await User.find()
  return data
}

// const getSingleUserFromDB = async (id: string) => {
//   const data = await User.findById(id)
//   return data
// }

const updateUserFromDB = async (id: string, payload: Partial<TUser>) => {
  const data = await User.findByIdAndUpdate(id, payload, { new: true })
  return data
}

const deleteUserFromDB = async (id: string) => {
  const data = await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  )
  return data
}

const getUserProfileFromDB = async (id: string, role: string) => {
  let data
  if (role === "admin") {
    data = await User.findById(id)
  }
  if (role === "customer") {
    data = await User.findById(id)
  }

  return data
}

export const UserService = {
  createUserToDB,
  getAllUsersFromDB,
  // getSingleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
  getUserProfileFromDB,
}
