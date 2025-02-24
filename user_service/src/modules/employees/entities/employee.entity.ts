import { User } from '@shared/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EmployeeRoLe } from '../enums/role.enum';
import { EmployeeStatus } from '../enums/employeeStatus.enum';

@Entity({ name: 'emloyees' })
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  personalCardNumber: string;

  @Column({ type: 'decimal' })
  salary: number;

  @Column({
    type: 'enum',
    enum: EmployeeRoLe,
    default: EmployeeRoLe.CALL_CENTER,
  })
  position: EmployeeRoLe;

  @Column({ type: 'timestamptz' })
  startAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: EmployeeStatus,
    default: EmployeeStatus.ACTIVE,
  })
  status: EmployeeStatus;

  @Column({ type: 'time' })
  workStartTime: string;

  @Column({ type: 'time' })
  workEndTime: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
