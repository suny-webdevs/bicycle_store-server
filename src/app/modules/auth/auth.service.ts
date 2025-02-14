import AppError from "../../errors/AppError"
import { User } from "../user/user.model"
import { TAuth } from "./auth.type"
import httpStatus from "http-status"
import { createToken, verifyToken } from "./auth.utils"
import config from "../../config"
import { JwtPayload } from "jsonwebtoken"
import bcrypt from "bcrypt"

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

  const refreshToken = createToken(
    jwtPayload,
    config.jwtRefreshSecret as string,
    config.jwtRefreshExpiresIn as string
  )

  return { token, refreshToken, changePassword: user?.changePassword }
}

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  // checking if the user is exist
  const user = await User.findOne(userData.email)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !")
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !")
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, "Password did not matched")

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.saltRound)
  )

  await User.findOneAndUpdate(
    {
      email: userData.email,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      changePassword: false,
      passwordChangedAt: new Date(),
    }
  )

  return null
}

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwtRefreshSecret as string)

  const { email, iat } = decoded

  // checking if the user is exist
  const user = await User.findOne({ email })

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!")
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted!")
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!")
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwtAccessSecret as string,
    config.jwtAccessExpiresIn as string
  )

  return {
    token: accessToken,
  }
}

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
}
