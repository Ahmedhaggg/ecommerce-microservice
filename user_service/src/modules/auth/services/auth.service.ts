import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../shared/entities/user.entity';
import bcrypt from 'bcrypt';
import { ConfigService } from '@shared/services/config.service';
import { AccessTokenPayload, RefreshTokenPayload } from '../types/payload.type';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from '@shared/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser({ email, password }: LoginDto): Promise<User> {
    const user = await this.userRepository.findOne({ email });

    if (!user) throw new NotFoundException('user not found');

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      throw new UnauthorizedException('invalid email or password');

    delete user.password;

    return user;
  }

  async register(userDto: RegisterDto) {
    const password = await this.hashPassword(userDto.password);
    const verificationToken = this.generateVerificationToken();
    const tokenExpiration = this.getTokenExpiration();
    await this.userRepository.create({
      ...userDto,
      password,
      verificationToken,
      verificationTokenExpires: tokenExpiration,
    });
  }
  async checkEmailVerification(verificationToken: string): Promise<void> {
    const verificationData = await this.userRepository.findOne(
      { verificationToken },
      ['id', 'verificationTokenExpires'],
    );

    if (!verificationToken)
      throw new NotFoundException('Invalid verification token');

    if (verificationData.verificationTokenExpires.getTime() < Date.now())
      throw new BadRequestException('Verification Topic is Expired');

    await this.userRepository.updateById(verificationData.id, {
      isVerified: true,
      verificationToken: null,
      verificationTokenExpires: null,
    });
  }

  private getTokenExpiration() {
    return new Date(Date.now() + 1 * 60 * 60 * 1000);
  }
  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.configService.hashSolt);
  }
  private generateVerificationToken() {
    return uuidv4();
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
}
