import { CreateDateColumn, UpdateDateColumn } from "typeorm"

/** basic entity for Each Entity */
export abstract class BasicEntity {
  /** auto generate create time // also for sort */
  @CreateDateColumn({ type: "timestamp" })
  createdAt: number
  /** auto generate update time  */
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: number
}
