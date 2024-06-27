import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { forgotPasswordDto } from './dto/forgotPassword.dto';
import { Subject } from 'rxjs';
import nodemailer from 'nodemailer';

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

  async generateToken(user: UserDocument):Promise<string> {

    const userId = user._id;
    const token = this.jwtService.sign({ userId }, { expiresIn: '1h' });
    await this.userService.updateUserById(userId, { token });
    return token;
  }

  async validateToken(token: string): Promise<UserDocument> {
    const payload = this.jwtService.verify(token);
    const user = await this.userService.fetchUserById(payload.userId);
   return user;
  }

  async sendMail(value: { email: string; otp: any; }) {
    const mailDetails = {
      from: process.env.NODEMAILER_EMAIL,
      to: value.email,
      subject: 'Your Otp',
      text: `Your otp is ${value.otp}`,
    };
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: process.env.NODEMAILER_HOST,
      port: process.env.NODEMAILER_PORT,
      secure: true, 
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });
    transporter.sendMail(mailDetails, function (err: any, info: { response: any; }) {
      if (err) {
        console.error('Error occurred while sending email:', err);
      } else {
        console.log('Email sent successfully! Response:', info.response);
      }
    });
  }
}
