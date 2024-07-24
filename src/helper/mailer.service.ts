import { Injectable, Type } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

import { Types } from 'mongoose';
dotenv.config();

@Injectable()
export class MailerService {

  constructor(
  ) {}

    async sendMail(value: { email: string; otp: any; }) {
        const mailDetails = {
          from: process.env.NODEMAILER_EMAIL,
          to: value.email,
          subject: 'Your Otp',
          text: `Your otp is ${value.otp}`,
        };
        console.log('Nodemailer:', nodemailer);

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
