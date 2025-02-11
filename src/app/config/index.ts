import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.join((process.cwd(), ".env")) })

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  saltRound: process.env.SALT_ROUND,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  cloudName: process.env.CLOUD_NAME,
  cloudKey: process.env.CLOUD_KEY,
  cloudSecret: process.env.CLOUD_SECRET,
}
