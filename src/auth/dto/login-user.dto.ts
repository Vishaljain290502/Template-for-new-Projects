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