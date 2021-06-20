import { Entity, ObjectID, ObjectIdColumn, Column, Index } from "typeorm";

@Entity("users")
export class User {
  @ObjectIdColumn()
  id!: ObjectID;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;
}
