import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './modules/shared/services/config.service';
import { SharedModule } from './modules/shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { ConfigModule } from '@nestjs/config';
import appConfig from './modules/shared/config/app.config';
import jwtConfig from './modules/shared/config/jwt.config';
import databaseConfig from './modules/shared/config/database.config';
import { CustomerModule } from './modules/customers/customer.module';
import { User } from '@shared/entities/user.entity';
import { RefreshToken } from './modules/auth/entities/refreshToken.entity';
import { EmployeeModule } from './modules/employees/employee.module';
import { Employee } from './modules/employees/entities/employee.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, jwtConfig, databaseConfig],
    }),
    SharedModule,
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.databaseUrl,
        entities: [User, RefreshToken, Employee],
        synchronize: true, // ⚠️ Only for development!
      }),
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [SharedModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          store: [createKeyv(configService.redisUrl)],
        };
      },
    }),
    AuthModule,
    CustomerModule,
    EmployeeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
