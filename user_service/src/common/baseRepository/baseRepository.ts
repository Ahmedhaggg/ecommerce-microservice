import { FindOptionsWhere, Repository } from 'typeorm';
import {
  Columns,
  FindOneQuery,
  FindQuery,
  IBaseRepository,
} from './repository.interface';

export class BaseRepository<T> implements IBaseRepository<T> {
  constructor(protected readonly repository: Repository<T>) {}

  async findOne(query: FindOneQuery<T>, columns?: Columns<T>): Promise<T> {
    const result = await this.repository.find({
      where: query,
      take: 1,
      select: columns,
    });
    return result[0];
  }
  async find(query: FindQuery<T>, columns?: Columns<T>): Promise<T[]> {
    return await this.repository.find({
      where: query.where,
      take: query.limit,
      skip: query.offset,
      select: columns,
    });
  }
  async findById(id: string, columns?: Columns<T>): Promise<T> {
    return await this.repository.findOne({
      where: { id } as unknown as FindOptionsWhere<T>,
      select: columns,
    });
  }
  async deleteById(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected == 0 ? false : true;
  }
  async updateById(id: string, data: Partial<T>): Promise<T> {
    await this.repository.update(id, data as any);
    return await this.findById(id);
  }
  async create(data: Partial<T>): Promise<T> {
    return await this.repository.save(data as any);
  }
  async count(query: FindOneQuery<T>): Promise<number> {
    return this.repository.count({
      where: query as unknown as FindOptionsWhere<T>,
    });
  }
  async countd(query: FindOneQuery<T>): Promise<number> {
    return this.repository.count({
      where: query as unknown as FindOptionsWhere<T>,
    });
  }
}
