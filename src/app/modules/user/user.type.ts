import { Model, Types } from "mongoose"
import { USER_ROLE } from "./user.constant"

export type TUser = {
  _id: Types.ObjectId
  name: string
  email: string
  phone: string
  password: string
  image?: string
  role: "admin" | "customer"
  address?: string
  city?: string
  isDeleted: boolean
}

export interface UserModel extends Model<TUser> {
  isPasswordMatched(
    textedPassword: string,
    hashedPassword: string
  ): Promise<boolean>
  // isTokenValidForChangePassword(
  //   changePasswordTime: Date,
  //   jwtIssuedTime: number
  // ): boolean
}
export type TUserRole = keyof typeof USER_ROLE
