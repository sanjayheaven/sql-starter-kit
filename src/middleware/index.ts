import Cors from "koa2-cors"
import KoaBody from "koa-body"
import Logger from "./logger"
import ErrorHandle from "./errorHandle"

// Compose func
import Compose from "koa-compose"

// global middleware
export default Compose([Logger, ErrorHandle, KoaBody(), Cors()])

export { Logger, ErrorHandle }
