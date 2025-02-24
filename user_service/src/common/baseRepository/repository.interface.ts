export type FindOneQuery<T> = Partial<Record<keyof T, any>>;

export type FindQuery<T> = {
  where: FindOneQuery<T>;
  limit: number;
  offset: number;
};

export type Columns<T> = (keyof T)[];

export interface IBaseRepository<T> {
  findOne(query: FindOneQuery<T>, columns?: Columns<T>): Promise<T>;
  find(query: FindQuery<T>, columns?: Columns<T>): Promise<T[]>;
  findById(id: string, columns?: Columns<T>): Promise<T>;
  deleteById(id: string): Promise<boolean>;
  updateById(id: string, data: Partial<T>): Promise<T>;
  create(data: Partial<T>): Promise<T>;
  count(query: Partial<T>): Promise<number>;
}
