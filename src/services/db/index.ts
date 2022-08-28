import { DataSource } from "typeorm"
import { RoleEntity } from "./entities/role"
import { StaffEntity } from "./entities/staff"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "KM7",
  /** very important, must be false in production */
  synchronize: process.env.NODE_ENV != "production",
  /** only open logging in dev env */
  // logging: process.env.NODE_ENV != "production",
  logging: false,
  entities: [StaffEntity, RoleEntity],
  subscribers: [],
  migrations: [],
})

export const initAdmin = async () => {
  const StaffRepository = AppDataSource.getRepository(StaffEntity)
  const RoleRepository = AppDataSource.getRepository(RoleEntity)
  try {
    let role = await RoleRepository.findOneBy({ name: "superAdmin" })
    let staff = await StaffRepository.findOneBy({
      username: "admin",
      name: "admin",
    })
    let superAdminRole: RoleEntity
    if (role && staff) return
    if (!role) {
      superAdminRole = await new RoleEntity()
      superAdminRole.name = "superAdmin"
      superAdminRole.desc = "super admin"
      role = await RoleRepository.save(superAdminRole)
    }
    if (!staff) {
      let newAdmin = new StaffEntity()
      newAdmin.username = "admin"
      newAdmin.name = "admin"
      newAdmin.phone = 0
      newAdmin.password = "admin"
      newAdmin.role = role
      await StaffRepository.save(newAdmin)
    }
  } catch (error) {
    console.log(error)
  }
}

export const connect = async () => {
  return new Promise(async (resolve, reject) => {
    AppDataSource.initialize()
      .then(() => {
        console.log(`🍟: Successfully connected to DB`)
        resolve(`🍟: Successfully connected to DB`)
      })
      .catch((error) => {
        console.log(error)
        console.log(`😫: Connected failed, check your DB `)
        reject(`😫: Connected failed, check your DB with`)
      })
  }).then(() => initAdmin())
}
