import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import AppError from "../errors/AppError"
import httpStatus from "http-status"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config"
import { User } from "../modules/user/user.model"
import { TUserRole } from "../modules/user/user.type"

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(
    async (req: Request, _res: Response, next: NextFunction) => {
      const token = req.headers.authorization
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "UNAUTHORIZED access")
      }

      const decoded = jwt.verify(
        token as string,
        config.jwtAccessSecret as string
      ) as JwtPayload

      const { email, role } = decoded

      // Finding user by custom id from token
      const user = await User.findOne({ email })

      // Checking if user is not exists
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found")
      }
      if (user?.isDeleted || (requiredRole && !requiredRole.includes(role))) {
        throw new AppError(httpStatus.UNAUTHORIZED, "UNAUTHORIZED access")
      }

      req.user = decoded as JwtPayload

      next()
    }
  )
}

export default auth
