import express, { Application } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import router from "./app/router"
import globalErrorHandler from "./app/middlewares/globalErrorHandler"
import notFound from "./app/middlewares/notFound"

const app: Application = express()

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: ["http://localhost:5173", "https://buycycle.vercel.app"],
    credentials: true,
  })
)

app.use("/api", router)

app.get("/", (req, res) => {
  res.json({ success: true, message: "Welcome to Bicycle store server" })
})

app.use(globalErrorHandler)
app.use(notFound)

export default app
