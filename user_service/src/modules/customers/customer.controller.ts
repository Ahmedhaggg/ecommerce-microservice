import { Controller, Get, Param, UseGuards, Query } from '@nestjs/common';
import { CustomerService } from './cusomer.service';
import { JwtAuthGuard } from '@common/guards/jwtAuth.guard';
import { Roles } from '@common/decorators/roles.decorator';
import { Role } from '@common/enums/roles.enum';
import { RolesGuard } from '@common/guards/roles.guard';
import { QueryUsersDto } from '@common/dtos/queryUsers.dto';

@Controller('v1/customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Get('count')
  async count() {
    const counts = await this.customerService.countCustomers();
    return { counts };
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Get(':id')
  async show(@Param('id') id: string) {
    const customer = await this.customerService.getCustomerInfo(id);
    return {
      customer,
    };
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Get('')
  async index(@Query() query: QueryUsersDto) {
    const customers = await this.customerService.getCustomers(query);

    return {
      customers,
    };
  }
}
