import { PaginationDto } from '@common/dtos/queryPagination.dto';
import { IsOptional, IsString } from 'class-validator';

export class QueryUsersDto extends PaginationDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;
}
