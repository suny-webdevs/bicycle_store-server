export type TUser = {
  name: string
  email: string
  phone: string
  password: string
  image?: string
  role: "admin" | "customer"
  address: string
  isDeleted: boolean
}
