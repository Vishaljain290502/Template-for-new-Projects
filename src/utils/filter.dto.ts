// src/common/dto/pagination.dto.ts
import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class FilterDto {
  @IsOptional()
  @IsString()
  search?: string; 

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number; 

  @IsOptional()
  @IsInt()
  @Min(0)
  page?: number; 
}
