import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LocalAuthGuard } from '@common/guards/localAuth.guard';
import { CurrentUser } from '@common/decorators/reqUser.decorator';
import { User } from '../shared/entities/user.entity';
import { LoginValidationGuard } from './guards/loginValidation.guard';
import { TokenService } from './services/token.service';

@Controller('auth/v1')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @UseGuards(LoginValidationGuard)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  async login(@CurrentUser() user: User) {
    const tokens = await this.tokenService.createLoginTokens(user);
    return {
      ...tokens,
      success: true,
    };
  }

  @Post('register')
  async register(@Body() registerData: RegisterDto) {
    await this.authService.register(registerData);
    return { success: true };
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    await this.authService.checkEmailVerification(token);
    return { success: true };
  }
}
