import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get port(): number {
    return this.configService.get<number>('app.port', 3000);
  }

  get jwtAccessTokenSecret(): string {
    return this.configService.get<string>('jwt.accessTokenSecret');
  }

  get jwtAccessTokenExpiration(): string {
    return this.configService.get<string>('jwt.accessTokenExpiration');
  }
  get jwtRefreshTokenSecret(): string {
    return this.configService.get<string>('jwt.refreshTokenSecret');
  }

  get jwtRefreshTokenExpiration(): string {
    return this.configService.get<string>('jwt.refreshTokenExpiration');
  }

  get databaseUrl(): string {
    console.log(
      this.configService.get<string>('database.url'),
      this.configService.get<string>('app.redisUrl'),
    );
    return this.configService.get<string>('database.url');
  }
  get hashSolt(): string {
    return this.configService.get<string>('app.hashSolt');
  }
  get redisUrl(): string {
    return this.configService.get<string>('app.redisUrl');
  }
}
