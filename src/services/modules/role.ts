import { AppDataSource } from "../db"
import { Sort } from "../../types"
import { FindOptionsWhere, ILike, Not } from "typeorm"
import { RoleEntity } from "../db/entities/role"
const RoleRepository = AppDataSource.getRepository(RoleEntity)

export type ICreateRole = Pick<RoleEntity, "name" | "desc">
export const createRole = async ({ name, desc }: ICreateRole) => {
  let role = new RoleEntity()
  role = { ...role, name, desc }
  let res = await RoleRepository.save(role)
  return res
}

export const getRoles = async ({
  name,
  skip = 0,
  limit = 10,
}: {
  name?: string
  skip?: number
  limit?: number
}) => {
  let filter: FindOptionsWhere<RoleEntity> | FindOptionsWhere<RoleEntity>[] = {}
  if (name) {
    filter = [
      { ...filter, name: ILike(`%${name}%`) },
      { ...filter, desc: ILike(`%${name}%`) },
    ]
  }
  let [roles, total] = await RoleRepository.findAndCount({
    where: filter,
    order: { createdAt: Sort.DESC },
    skip,
    take: limit,
    select: { id: true, name: true, desc: true },
  })
  return { roles, total }
}

export type IUpdateRole = Pick<RoleEntity, "name" | "desc"> & { roleId: number }
export const updateRole = async ({ roleId, name, desc }: IUpdateRole) => {
  console.log(roleId, 101001)
  /** big issue, if roleId null/ */
  let role = roleId ? await RoleRepository.findOneBy({ id: roleId }) : null
  if (!role) {
    //
    return // not exist
  }
  role.desc = desc
  role.name = name
  return await RoleRepository.save(role)
}
