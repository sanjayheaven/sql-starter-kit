import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { StaffEntity } from "./staff"
import { BasicEntity } from "./_abstract"

export enum RoleStatus {
  DELETED = 0,
  ACTIVE = 1,
}

@Entity("role")
export class RoleEntity extends BasicEntity {
  /** primary  key */
  @PrimaryGeneratedColumn()
  id: number
  /** role name,shoule be unique */
  @Column({ unique: true })
  name: string
  /** role description */
  @Column({ type: "text" })
  desc: string

  /**
   * Relations
   */

  /** relations  */
  @OneToMany(() => StaffEntity, (many) => many.role)
  staffs: StaffEntity[]
}
