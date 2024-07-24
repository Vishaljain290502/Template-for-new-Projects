import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  hashedPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  matchPassword(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }

  async generateToken(user: User): Promise<string> {
    const payload = { email: user.email, sub: user._id };
    return this.jwtService.sign(payload);
  }

  async validateToken(token: string): Promise<User> {
    const payload = this.jwtService.verify(token);
    const user = await this.userService.fetchUserById(payload.userId);
   return user;
  }

  async generateOtp(): Promise<string> {
    return crypto.randomInt(100000, 999999).toString();
  }



  private readonly FIXED_OTP = '123456';
  async verifyOtp(user: any, otp: string): Promise<boolean> {
    return otp === this.FIXED_OTP;
  }

  serializeUser(user:User){
    return {
      name: user.name,
      email:user.email,
      token:user.token
    }
  }
}
