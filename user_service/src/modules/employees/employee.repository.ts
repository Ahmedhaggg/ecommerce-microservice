import { BaseRepository } from '@common/baseRepository/BaseRepository';
import {
  Columns,
  FindQuery,
} from '@common/baseRepository/repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@shared/entities/user.entity';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

type EmployeeSearchQuery = Employee & {
  firstName?: string;
  lastName?: string;
  email?: string;
};

@Injectable()
export class EmployeeRepository extends BaseRepository<Employee> {
  private readonly defaultColumns = [
    'user.firstName',
    'user.lastName',
    'user.email',
    'user.phoneNumber',
  ];

  constructor(
    @InjectRepository(Employee)
    protected readonly repository: Repository<Employee>,
  ) {
    super(repository);
  }
  async findById(id: string, columns?: Columns<Employee>): Promise<Employee> {
    return this.repository
      .createQueryBuilder('employee')
      .where('id = :id', { id })
      .leftJoinAndSelect('employee.user', 'user')
      .addSelect([
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.phoneNumber',
      ])
      .limit(1)
      .getOne();
  }
  async find(
    query: FindQuery<
      Employee & { firstName?: string; lastName?: string; email?: string }
    >,
    columns?: Columns<Employee & User>,
  ): Promise<Employee[]> {
    const queryDB = this.repository
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.user', 'user');

    Object.entries(query.where).forEach(([key, value]) => {
      if (value === undefined || key === 'user') return;
      if (key == 'firstName' || key == 'lastName' || key == 'email')
        queryDB.andWhere(`user.${key} LIKE :${key}`, { [key]: `%${value}%` });
      else queryDB.andWhere(`employee.${key} = :${key}`, { [key]: value });
    });

    const employeeColumns = this.repository.metadata.columns.map(
      (col) => `employee.${col.propertyName}`,
    );

    queryDB.select([...this.defaultColumns, ...employeeColumns]);
    queryDB.limit(query.limit).skip(query.offset).getMany();
    return;
  }
}
