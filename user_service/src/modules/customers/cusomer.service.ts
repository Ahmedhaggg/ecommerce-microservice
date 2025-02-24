import { Injectable } from '@nestjs/common';
import { User } from '../shared/entities/user.entity';
import { UserRepository } from '@shared/repositories/user.repository';
import { Role } from '@common/enums/roles.enum';
import { CustomerCacheService } from './customerCache.service';
import { QueryUsersDto } from '@common/dtos/queryUsers.dto';

@Injectable()
export class CustomerService {
  private readonly selectedFields: (keyof User)[] = [
    'firstName',
    'lastName',
    'phoneNumber',
    'email',
    'createdAt',
    'isVerified',
  ];

  constructor(
    private readonly userRepository: UserRepository,
    private readonly customerCacheService: CustomerCacheService,
  ) {}

  async getCustomerInfo(id: string): Promise<User> {
    return this.userRepository.findOne(
      { id, role: Role.CUSTOMER },
      this.selectedFields,
    );
  }

  async getCustomers(query: QueryUsersDto): Promise<User[]> {
    const where = {
      ...(query.firstName && { firstName: query.firstName }),
      ...(query.lastName && { lastName: query.lastName }),
      role: Role.CUSTOMER,
    };
    return this.userRepository.find(
      {
        where,
        limit: query.limit,
        offset: query.offset,
      },
      this.selectedFields,
    );
  }

  async countCustomers(): Promise<number> {
    let customersCount = await this.customerCacheService.getCustomersCount();

    if (customersCount) return customersCount;

    customersCount = await this.userRepository.count({ role: Role.CUSTOMER });

    await this.customerCacheService.setCustomersCount(customersCount);

    return customersCount;
  }
}
