import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';

@Module({ 
  imports:[MongooseModule.forFeature([{name:"User",schema:userSchema}])],
  controllers: [AuthController],
  providers: [AuthService,UserService],
})
export class AuthModule {}
