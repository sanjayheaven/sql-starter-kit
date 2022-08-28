import { z } from "zod"

export const createStaff = z.object({
  name: z.string(),
  username: z.string(),
  phone: z.number(),
  roleId: z.number(),
})

