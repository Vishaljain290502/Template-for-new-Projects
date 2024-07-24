import { IsString, IsBoolean, IsDate, IsOptional, IsArray, ArrayNotEmpty } from 'class-validator';

export class UserDto {
  @IsString()
  readonly name: string;

  @IsDate()
  readonly dob: Date;

  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsOptional()
  @IsString()
  readonly token?: string;

  @IsOptional()
  @IsString()
  readonly mobileNumber?: string;

  @IsBoolean()
  readonly isPhoneVerified: boolean;

  @IsBoolean()
  readonly isEmailVerified: boolean;

  @IsOptional()
  @IsDate()
  readonly resetTokenExpiration?: Date;

  @IsOptional()
  @IsString()
  readonly otp?: string;

  @IsOptional()
  @IsString()
  readonly address?: string;

  @IsOptional()
  readonly location?: {
    type: string;
    coordinates: [number, number];
  };
}
