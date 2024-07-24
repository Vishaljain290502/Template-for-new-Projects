import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HelperModule } from './helper/helper.module';

@Module({
  imports: [UserModule, AuthModule,MongooseModule.forRoot('mongodb+srv://vishaljaurasoft:uWkjdnz06DQ2zDKg@cluster0.lcqe8e7.mongodb.net/rydr?retryWrites=true&w=majority&appName=Cluster0'), HelperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
