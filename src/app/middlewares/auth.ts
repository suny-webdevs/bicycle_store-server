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

      const { email, role, iat } = decoded

      console.log({ decoded })

      // Finding user by custom id from token
      const user = await User.findOne({ email })

      console.log({ user })

      // Checking if user is not exists
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found")
      }

      console.log({ requiredRole })

      if (user?.isDeleted) {
        throw new AppError(httpStatus.UNAUTHORIZED, "UNAUTHORIZED access")
      }

      if (requiredRole && !requiredRole.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, "UNAUTHORIZED access")
      }

      if (
        user.passwordChangedAt &&
        User.isJWTIssuedBeforePasswordChanged(
          user.passwordChangedAt,
          iat as number
        )
      ) {
        throw new AppError(httpStatus.UNAUTHORIZED, "UNAUTHORIZED access!")
      }

      req.user = decoded as JwtPayload & { role: string }
      next()
    }
  )
}

export default auth
