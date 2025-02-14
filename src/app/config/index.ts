import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.join((process.cwd(), ".env")) })

export default {
  NODE_ENV: process.env.NODE_ENV,
  adminPassword: process.env.ADMIN_PASSWORD,
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  saltRound: process.env.SALT_ROUND,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  cloudName: process.env.CLOUD_NAME,
  cloudKey: process.env.CLOUD_KEY,
  cloudSecret: process.env.CLOUD_SECRET,
  spEndpoint: process.env.SP_ENDPOINT,
  spUsername: process.env.SP_USERNAME,
  spPassword: process.env.SP_PASSWORD,
  spPrefix: process.env.SP_PREFIX,
  spReturnUrl: process.env.SP_RETURN_URL,
}
