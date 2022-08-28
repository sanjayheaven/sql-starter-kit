import Compose from "koa-compose"
import { IMiddleware } from "koa-router"

import StaffRouters from "./staff"

/**
 * register router here
 *
 */
const routers = [...StaffRouters]

let routes = routers.reduce((acc: IMiddleware[], router) => {
  acc.push(router.routes())
  acc.push(router.allowedMethods())
  return acc
}, [])

export default Compose([...routes])
