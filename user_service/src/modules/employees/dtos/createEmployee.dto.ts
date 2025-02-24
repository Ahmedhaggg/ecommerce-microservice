import { RegisterDto } from 'src/modules/auth/dtos/register.dto';
import { Employee } from '../entities/employee.entity';
import { IsEgyptianId } from '../utils/egyptianId.validator';
import {
  IsDate,
  IsDecimal,
  IsEnum,
  IsString,
  IsTimeZone,
} from 'class-validator';
import { EmployeeRoLe } from '../enums/role.enum';
import { EmployeeStatus } from '../enums/employeeStatus.enum';

export class CreateEmployeeDto extends RegisterDto {
  @IsString()
  @IsEgyptianId()
  personalCardNumber: string;

  @IsDecimal()
  salary: number;

  @IsEnum(EmployeeRoLe)
  postion: EmployeeRoLe;

  @IsDate()
  startAt: Date;

  @IsEnum(EmployeeStatus)
  status: EmployeeStatus;

  @IsTimeZone()
  workStartTime;
}
