import { AppDataSource } from "../db"
import CryptoJS from "crypto-js"
import { Sort } from "../../types"
import { FindOptionsWhere, ILike, Not } from "typeorm"
import { StaffEntity, StaffStatus } from "../db/entities/staff"
import { RoleEntity } from "../db/entities/role"

const cryptojsKey = "helloword"
const StaffRepository = AppDataSource.getRepository(StaffEntity)
const RoleRepository = AppDataSource.getRepository(RoleEntity)

export type ICreateStaff = Pick<StaffEntity, "name" | "phone" | "username"> & {
  roleId: number
}
export const createStaff = async ({
  name,
  phone,
  username,
  roleId,
}: ICreateStaff) => {
  /**
   * - check username is unique
   * - find and check role by roleId
   */
  let role = roleId ? await RoleRepository.findOneBy({ id: roleId }) : null
  if (!role) {
    return // erro
  }

  let staff = new StaffEntity()
  staff = { ...staff, name, username, phone }
  staff.password = CryptoJS.HmacSHA256("1234", cryptojsKey).toString()
  staff.role = role
  let res = await StaffRepository.save(staff)
  res.password = undefined
  return res
}

export const deleteStaff = async (staffId: string) => {
  return {}
}

export const getStaffs = async ({
  name,
  status,
  skip = 0,
  limit = 10,
}: {
  name?: string
  skip?: number
  limit?: number
  status?: StaffStatus
}) => {
  let filter: FindOptionsWhere<StaffEntity> | FindOptionsWhere<StaffEntity>[] =
    { username: Not("admin") } // superAdmin
  status != undefined && (filter["status"] = status)
  if (name) {
    filter = [
      { ...filter, name: ILike(`%${name}%`) },
      { ...filter, username: ILike(`%${name}%`) },
    ]
  }
  let [staffs, total] = await StaffRepository.findAndCount({
    where: filter,
    order: { createdAt: Sort.DESC }, // Not sure: if here use createdAt, must return the columns in following select
    skip,
    take: limit,
    select: {
      id: true,
      name: true,
      phone: true,
      username: true,
      createdAt: true,
    },
    relations: { role: true },
  })
  // staffs.forEach((staff) => {
  //   staff.role = { name: staff.role.name, desc: staff.role.desc } as any
  // })
  return { staffs, total }
}

export type IUpdateStaff = Pick<StaffEntity, "name" | "phone" | "username"> & {
  staffId: number
}
export const updateStaff = async ({
  staffId,
  name,
  username,
  phone,
}: IUpdateStaff) => {
  let staff = staffId ? await StaffRepository.findOneBy({ id: staffId }) : null
  if (!staff) {
    //
    return // not exist
  }
  staff = { ...staff, name, phone, username }
  let res = await StaffRepository.save(staff)
  res.password = undefined
  return res
}
