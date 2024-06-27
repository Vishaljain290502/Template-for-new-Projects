import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email: email });
  }

  async updateUserById(userId: Types.ObjectId, updateBody: any) {
    return await this.userModel.findByIdAndUpdate(userId, updateBody);
  }
  async fetchUserById(userId: Types.ObjectId) {
    return await this.userModel.findById(userId);
  }

  async saveResetToken(
    user: UserDocument,
    token: string,
    expirationDate: Date,
  ): Promise<void> {
    user.token = token;
    user.resetTokenExpiration = expirationDate;
    await user.save();
  }

  async updatePassword(user: UserDocument, newPassword: string): Promise<void> {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(newPassword, salt);
    user.token = null;
    user.resetTokenExpiration = null;
    await user.save();
  }
}
