import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CustomerCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  private readonly CUSTOMERS_COUNT = 'employees_count';
  private readonly CACHE_TTL = 60_000;

  async getCustomersCount(): Promise<number> {
    return this.cacheManager.get<number>(this.CUSTOMERS_COUNT) ?? 0;
  }

  async setCustomersCount(count: number): Promise<void> {
    await this.cacheManager.set(this.CUSTOMERS_COUNT, count, this.CACHE_TTL);
  }
}
