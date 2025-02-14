import { JwtPayload } from "jsonwebtoken"
// import { TUser } from "../modules/user/user.type"

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload
      // userData: TUser
    }
  }
}
