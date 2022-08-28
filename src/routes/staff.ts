import Router from "koa-router"
import { manageRouteV1Prefix } from "../config/route"
import * as Controller from "../controllers/staff"
import * as Validation from "../validations/staff"
import Validate from "../middleware/validate"

const v1 = new Router({ prefix: manageRouteV1Prefix + "/staffs" })

v1.post("/updateStaff", Controller.updateStaff)
v1.post(
  "/createStaff",
  Validate(Validation.createStaff),
  Controller.createStaff
)
v1.get("/getStaffs", Controller.getStaffs)

export default [v1]
