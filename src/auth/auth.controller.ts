import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { forgotPasswordDto } from './dto/forgotPassword.dto';
import * as nodemailer from 'nodemailer';
import { ResetPasswordDto } from './dto/resetPassword.dto';

@Controller('auth')
export class AuthController {
    
    constructor(
        private readonly authService:AuthService,
        private readonly userService:UserService,
   
    ){}


    @Post('/register')
    async register(@Body() createUserDto:CreateUserDto) {
        let user = await this.userService.findUserByEmail(createUserDto.email);
        if(user){
            throw new BadRequestException("User with Email already exist");
        }
        createUserDto.password = this.authService.hashedPassword(createUserDto.password);
        user = await this.userService.createUser(createUserDto);
        return user;
    }

    
    @Post('/login')
    async login(@Body() loginUserDto:LoginUserDto) {
        
        const user = await this.userService.findUserByEmail(loginUserDto.email);
        if(!user){
            throw new BadRequestException("User Email not Found");
        }
        
        if(!this.authService.matchPassword(loginUserDto.password,user.password)){
            throw new BadRequestException("Password Not Matched");
        }
        return user;
    }

    @Post('forgot-password')
    async forgotPassword(@Body() forgotPasswordDto: forgotPasswordDto): Promise<any> {
      const user = await this.userService.findUserByEmail(forgotPasswordDto.email);
      if (!user) {
        throw new BadRequestException('User not found');
      }
      const token = await this.authService.generateToken(user);
    //       const user = await this.userService.findUserByEmail(email);
    // const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
      await this.authService.sendMail({ email: user.email, otp: token });
      return user;
    }
  
    @Post('reset-password')
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<any> {
      const user = await this.authService.validateToken(resetPasswordDto.token);
      if(!user){
        throw new BadRequestException("Token not validated");
      }
      await this.userService.updateUserById(user._id,{
        password:this.authService.hashedPassword(resetPasswordDto.password),
        token:null
      });

      return user;
    }
}