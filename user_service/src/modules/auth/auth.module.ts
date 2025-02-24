import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@shared/entities/user.entity';
import { RefreshToken } from './entities/refreshToken.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { RefreshTokenRepository } from './repositories/refreshToken.repositoy';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from '@shared/shared.module';
import { ConfigService } from '@shared/services/config.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [SharedModule], // ✅ Ensures access to ConfigService
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.jwtAccessTokenSecret,
        signOptions: { expiresIn: configService.jwtAccessTokenExpiration }, // 🔥 Customize expiration time
      }),
    }),
    TypeOrmModule.forFeature([RefreshToken]),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, RefreshTokenRepository],
})
export class AuthModule {}
