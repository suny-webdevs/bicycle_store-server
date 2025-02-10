import { model, Schema } from "mongoose"
import { TUser } from "./user.type"
import bcrypt from "bcrypt"
import config from "../../config"

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phone: { type: String, required: [true, "Phone is required"] },
    password: { type: String, required: [true, "Password is required"] },
    image: { type: String },
    role: { type: String, enum: ["admin", "customer"], default: "customer" },
    address: { type: String, required: [true, "Address is required"] },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
)

userSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

userSchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

userSchema.pre("aggregate", async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

userSchema.pre("save", async function (next) {
  const user = this
  user.password = await bcrypt.hash(user.password, Number(config.saltRound))
  next()
})

userSchema.post("save", function (doc, next) {
  doc.password = ""
  next()
})

export const User = model<TUser>("User", userSchema)
