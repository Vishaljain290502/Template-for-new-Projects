import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, IsMongoId, IsOptional, IsDate, IsBoolean } from 'class-validator';

export class UserDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

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


export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  mobileNumber: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string;

}

export class FetchUserDto {
  @IsMongoId()
  readonly id: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
   name?: string;
  @IsOptional()
  @IsDate()
   dob?: Date;

  @IsOptional()
  @IsString()
   email?: string;

  @IsOptional()
  @IsString()
   password?: string;

  @IsOptional()
  @IsString()
   token?: string;

  @IsOptional()
  @IsString()
   mobileNumber?: string;

  @IsOptional()
  @IsBoolean()
   isPhoneVerified?: boolean;

  @IsOptional()
  @IsBoolean()
   isEmailVerified?: boolean;

  @IsOptional()
  @IsDate()
   resetTokenExpiration?: Date;

  @IsOptional()
  @IsString()
   otp?: string;

  @IsOptional()
  @IsString()
   address?: string;

  @IsOptional()
   location?: {
    type: string;
    coordinates: [number, number];
  };
}
