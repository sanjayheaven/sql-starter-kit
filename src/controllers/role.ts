import type { IPagination } from "../types"
import { Context, Next } from "koa"
import * as RoleService from "../services/modules/role"
import { ICreateRole, IUpdateRole } from "../services/modules/role"

export const getRoles = async (ctx: Context) => {
  let { pageSize, current, name }: { name?: string } & IPagination =
    ctx.request.query
  let limit = (pageSize && +pageSize) || 10
  let skip = limit * (((current && +current) || 1) - 1)
  let res = await RoleService.getRoles({ skip, limit, name })
  ctx.body = res
}

export const createRole = async (ctx: Context) => {
  let { name, desc }: ICreateRole = ctx.request.body
  let res = await RoleService.createRole({ name, desc })
  ctx.body = res
}

export const updateRole = async (ctx: Context) => {
  let { roleId, name, desc }: IUpdateRole = ctx.request.body
  let res = await RoleService.updateRole({ name, desc, roleId })
  ctx.body = res
}
