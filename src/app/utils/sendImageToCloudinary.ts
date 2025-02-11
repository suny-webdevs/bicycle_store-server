import { v2 as cloudinary } from "cloudinary"
import config from "../config"
import multer from "multer"
import path from "path"
import fs from "fs"

export const sendImageToCloudinary = async (
  imageName: string,
  path: string
) => {
  // Configuration
  cloudinary.config({
    cloud_name: config.cloudName,
    api_key: config.cloudKey,
    api_secret: config.cloudSecret,
  })

  try {
    const uploadResult = await cloudinary.uploader.upload(path, {
      public_id: imageName,
    })

    fs.unlink(path, (err) => {
      if (err) {
        throw err
      } else {
        console.log("File deleted")
      }
    })
    return uploadResult
  } catch (error) {
    console.log(error)
  }
}

const UPLOAD_DIR = path.join(process.cwd(), "/uploads/")

// Ensure the upload folder exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true })
  console.log(`Upload folder created at: ${UPLOAD_DIR}`)
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix)
  },
})

export const upload = multer({ storage: storage })
