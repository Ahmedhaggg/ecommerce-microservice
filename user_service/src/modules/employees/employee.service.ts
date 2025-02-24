import { Injectable } from '@nestjs/common';
import { QueryUsersDto } from '@common/dtos/queryUsers.dto';
import { EmployeeRepository } from './employee.repository';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async getEmployeeInfo(id: string): Promise<Employee> {
    return this.employeeRepository.findById(id);
  }

  async getEmployees(query: QueryUsersDto): Promise<Employee[]> {
    return this.employeeRepository.find({
      where: { firstName: query.firstName, lastName: query.lastName },
      limit: query.limit,
      offset: query.offset,
    });
  }

  async countEmployees(): Promise<number> {
    return this.employeeRepository.count({});
  }
}
