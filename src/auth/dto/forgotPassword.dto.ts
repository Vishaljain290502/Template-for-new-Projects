// src/user/user.entity.ts
import { IsDate, IsNumber, IsString } from 'class-validator';

export class forgotPasswordDto {
  
  @IsString()
  email: string;

}
