import type { IPagination } from "../types"
import { Context, Next } from "koa"
import * as StaffService from "../services/modules/staff"
import { ICreateStaff, IUpdateStaff } from "../services/modules/staff"

export const getStaffs = async (ctx: Context) => {
  let {
    status,
    pageSize,
    current,
    name,
  }: { status?: number; name?: string } & IPagination = ctx.request.query
  let limit = (pageSize && +pageSize) || 10
  let skip = limit * (((current && +current) || 1) - 1)
  let res = await StaffService.getStaffs({ status, skip, limit, name })
  ctx.body = res
}

export const createStaff = async (ctx: Context) => {
  let { username, name, phone, roleId }: ICreateStaff = ctx.request.body
  let res = await StaffService.createStaff({ username, name, phone, roleId })
  ctx.body = res
}

export const updateStaff = async (ctx: Context) => {
  let { staffId, username, name, phone }: IUpdateStaff = ctx.request.body
  let res = await StaffService.updateStaff({ username, name, phone, staffId })
  ctx.body = res
}
