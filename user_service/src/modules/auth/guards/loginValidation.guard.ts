import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { LoginDto } from '../dtos/login.dto';
import { validate } from 'class-validator';

@Injectable()
export class LoginValidationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    // Transform and validate the request body against LoginDto
    const loginDto = plainToInstance(LoginDto, request.body);
    const errors = await validate(loginDto);

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed: ' + errors);
    }

    return true;
  }
}
