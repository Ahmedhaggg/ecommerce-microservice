import { ConfigService } from '@shared/services/config.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@shared/entities/user.entity';
import { AccessTokenPayload, RefreshTokenPayload } from '../types/payload.type';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenRepository } from '../repositories/refreshToken.repositoy';
import bcrypt from 'bcrypt';
@Injectable()
export class TokenService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private refreshTokenRepository: RefreshTokenRepository,
  ) {}

  public async createLoginTokens(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.createAccessToken(user as AccessTokenPayload),
      this.createRefreshToken(user as RefreshTokenPayload),
    ]);

    const hashedRefreshToken = await this.hashRefreshToken(refreshToken);

    await this.refreshTokenRepository.create({
      token: hashedRefreshToken,
      expiresAt: this.createRefreshTokenExpiration(),
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    const hashedRefreshToken = await this.hashRefreshToken(refreshToken);

    const refreshTokenData =
      await this.refreshTokenRepository.findByToken(hashedRefreshToken);

    if (!refreshTokenData) throw new UnauthorizedException();

    if (!refreshTokenData.isActive) {
      await this.refreshTokenRepository.deleteById(refreshTokenData.id);
      throw new UnauthorizedException();
    }

    return await this.createAccessToken(refreshTokenData.user);
  }

  private async hashRefreshToken(token: string) {
    return await bcrypt.hash(token, this.configService.hashSolt);
  }

  private async createAccessToken(
    payload: AccessTokenPayload,
  ): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.jwtAccessTokenSecret,
      expiresIn: this.configService.jwtAccessTokenExpiration,
    });
  }
  private async createRefreshToken(
    payload: RefreshTokenPayload,
  ): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.jwtRefreshTokenSecret,
      expiresIn: this.configService.jwtRefreshTokenExpiration,
    });
  }
  private createRefreshTokenExpiration(): Date {
    const days = parseInt(
      this.configService.jwtRefreshTokenExpiration.charAt(0),
    );
    return new Date(Date.now() + days * 24 * 60 * 60);
  }
}
