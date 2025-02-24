import { Global, Module } from '@nestjs/common';
import { ConfigService } from './services/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [ConfigService, UserRepository],
  exports: [ConfigService, UserRepository],
})
export class SharedModule {}
