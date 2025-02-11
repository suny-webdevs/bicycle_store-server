import { model, Schema } from "mongoose"
import { TUser, UserModel } from "./user.type"
import bcrypt from "bcrypt"
import config from "../../config"

const userSchema = new Schema<TUser, UserModel>(
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

userSchema.post(
  ["save", "findOneAndUpdate", "findOneAndDelete"],
  function (doc, next) {
    doc.password = ""
    next()
  }
)

userSchema.statics.isPasswordMatched = async function (
  textedPassword,
  hashedPassword
) {
  return await bcrypt.compare(textedPassword, hashedPassword)
}

export const User = model<TUser, UserModel>("User", userSchema)
