import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  position: string;

  @Column()
  companyName: string;

  @Column()
  companyUen: string;

  @Column("text", { array: true })
  documents: string[];
}