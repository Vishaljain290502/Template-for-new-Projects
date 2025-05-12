import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/dto';
import { LoginUserDto } from 'src/auth/dto/auth-dto';
import { UpdateUserDto } from './dto/dto';
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

  async findUserByPhoneNumber(mobileNumber: string): Promise<User> {
    return this.userModel.findOne({ mobileNumber }).exec();
  }
  async findUserByOtp(otp: string): Promise<User | null> {
    return this.userModel.findOne({ otp }).exec();
  }

  // async updateUserById(userId: Types.ObjectId, updateData: Partial<User>): Promise<User> {
  //   return this.userModel.findByIdAndUpdate(userId, updateData, { new: true }).exec();
  // }
  // async fetchUserById(userId: Types.ObjectId) {
  //   return await this.userModel.findById(userId);
  // }

  async saveResetToken(
    user: User,
    token: string,
    expirationDate: Date,
  ): Promise<void> {
    user.token = token;
    user.resetTokenExpiration = expirationDate;
    await user.save();
  }

  async updatePassword(user: User, newPassword: string): Promise<void> {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(newPassword, salt);
    user.token = null;
    user.resetTokenExpiration = null;
    await user.save();
  }

  // async getAllUsers(): Promise<User[]> {
  //   return this.userModel.find().exec();
  // }
  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users.map(user => user.toObject() as User);
  }
  async fetchUserById(id: Types.ObjectId): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async updateUserById(id: Types.ObjectId, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }
 
  
}
