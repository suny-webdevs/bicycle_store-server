import { Server } from "http"
import app from "./app"
import config from "./app/config"
import mongoose from "mongoose"

let server: Server

async function main() {
  try {
    await mongoose.connect(config.databaseUrl as string)

    server = app.listen(config.port, () => {
      console.log(`Server is on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()
