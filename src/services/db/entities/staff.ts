import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { RoleEntity } from "./role"
import { BasicEntity } from "./_abstract"
export enum StaffStatus {
  DELETED = 0,
  ACTIVE = 1,
  INACTIVE = 2,
}

@Entity("staff")
export class StaffEntity extends BasicEntity {
  /** primary  key */
  @PrimaryGeneratedColumn()
  id: number
  /** staff name */
  @Column()
  name: string
  /** staff phone, should be unique */
  @Column({ unique: true })
  phone: number
  /** staff username, should be unique */
  @Column({ type: "character varying", unique: true })
  username: string
  /** staff password, encrypted */
  @Column()
  password?: string
  /** staff status */
  @Column({ type: "enum", enum: StaffStatus, default: StaffStatus.ACTIVE })
  status: StaffStatus

  /**
   * Relations
   */

  /** staff role relations */
  @ManyToOne(() => RoleEntity, (one) => one.staffs, { nullable: false })
  role: RoleEntity
}
