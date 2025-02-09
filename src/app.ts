import express, { Application } from "express"
import cookieParser from "cookie-parser"

const app: Application = express()

app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
  res.json({ success: true, message: "Welcome to Bicycle store server" })
})

export default app
