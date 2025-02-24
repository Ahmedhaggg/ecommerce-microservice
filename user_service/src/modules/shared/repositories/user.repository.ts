import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { BaseRepository } from '@common/baseRepository/BaseRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectRepository(User) protected userRepo: Repository<User>) {
    super(userRepo);
  }
}
