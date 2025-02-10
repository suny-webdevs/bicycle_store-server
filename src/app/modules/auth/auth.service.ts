import AppError from "../../errors/AppError"
import { User } from "../user/user.model"
import { TAuth } from "./auth.type"
import httpStatus from "http-status"
import { createToken } from "./auth.utils"
import config from "../../config"
import { JwtPayload } from "jsonwebtoken"

const loginUser = async (payload: TAuth) => {
  if (payload.email === "" || payload.password === "") {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid login credentials")
  }

  const user = await User.findOne({ email: payload.email })
  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User not found, please register or input correct info"
    )
  }

  if (user?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "User was deleted")
  }

  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    user?.password
  )
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid login credentials")
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  }

  const token = createToken(
    jwtPayload,
    config.jwtAccessSecret as string,
    config.jwtAccessExpiresIn as string
  )

  return { token }
}

export const AuthServices = {
  loginUser,
}
