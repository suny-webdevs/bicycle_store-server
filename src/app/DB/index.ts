import config from "../config"
import { USER_ROLE } from "../modules/user/user.constant"
import { User } from "../modules/user/user.model"

const superUser = {
  name: "Md Suny Shaikh",
  email: "suny@gmail.com",
  phone: "+8801923827037",
  password: config.adminPassword,
  needsPasswordChange: false,
  role: USER_ROLE.admin,
  isDeleted: false,
}

const seedAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isAdminExits = await User.findOne({ role: USER_ROLE.admin })

  if (!isAdminExits) {
    await User.create(superUser)
  }
}

export default seedAdmin
