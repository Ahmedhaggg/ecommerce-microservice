import { User } from '../../shared/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;

  @Column({ type: 'timestamptz', nullable: false })
  expiresAt!: Date;

  @ManyToOne(() => User)
  user: User;

  get isActive() {
    return this.expiresAt.getTime() > Date.now();
  }
}
