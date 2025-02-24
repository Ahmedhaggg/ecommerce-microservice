import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerCacheService } from './customerCache.service';
import { CustomerService } from './cusomer.service';

@Module({
  controllers: [CustomerController],
  providers: [CustomerCacheService, CustomerService],
})
export class CustomerModule {}
