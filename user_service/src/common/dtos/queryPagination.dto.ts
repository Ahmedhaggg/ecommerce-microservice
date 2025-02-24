import { IsInt, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDto {
  @IsInt()
  @Min(1, { message: 'Page must be at least 1' })
  @Transform(({ value }) => parseInt(value, 10))
  page: number = 1;

  @IsInt()
  @Min(1, { message: 'Limit must be at least 1' })
  @Max(100, { message: 'Limit cannot exceed 100' })
  @Transform(({ value }) => parseInt(value, 10))
  limit: number = 10;

  get offset(): number {
    return (this.page - 1) * this.limit; // ✅ Convert page to offset
  }
}
