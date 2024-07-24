import { IsEmail, IsNotEmpty, IsString, MaxLength, Min, MinLength } from "class-validator";


export class LoginUserDto {
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @MinLength(6)
    @MaxLength(18)
    @IsNotEmpty()
    password:string;
}

export class GenerateOtpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}

export class ResetPasswordDto {
    @IsString()
    otp: string;
  
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;
  }

  
export class forgotPasswordDto {
    @IsString()
    email: string;
  }

  export class VerifyPhoneDto {
    @IsString()
    mobileNumber: string;

    @IsString()
    otp: string;
  }

  export class VerifyEmailDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    // @Length(6, 6) 
    otp: string;
}