import { Controller, Get, Param, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@common/guards/jwtAuth.guard';
import { Roles } from '@common/decorators/roles.decorator';
import { Role } from '@common/enums/roles.enum';
import { RolesGuard } from '@common/guards/roles.guard';
import { QueryUsersDto } from '@common/dtos/queryUsers.dto';
import { EmployeeService } from './employee.service';

@Controller('v1/employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Get('count')
  async count() {
    const counts = await this.employeeService.countEmployees();
    return { counts };
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Get(':id')
  async show(@Param('id') id: string) {
    const employee = await this.employeeService.getEmployeeInfo(id);

    return {
      employee,
    };
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Get('')
  async index(@Query() query: QueryUsersDto) {
    const employees = await this.employeeService.getEmployees(query);

    return {
      employees,
    };
  }
}
