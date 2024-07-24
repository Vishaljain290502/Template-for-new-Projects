import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { MailerService } from 'src/helper/mailer.service';


@Module({ 
  imports:[MongooseModule.forFeature([{name:"User",schema:userSchema}]),JwtModule.register({
    secret:"secretformecoceventmanagementsystem"
  }),],
  controllers: [AuthController],
  providers: [AuthService,UserService,MailerService],
})
export class AuthModule {}
