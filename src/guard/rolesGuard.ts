import { applyDecorators, CanActivate, createParamDecorator, ExecutionContext, UseGuards,ForbiddenException } from "@nestjs/common";


import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { Observable } from "rxjs";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/user.schema'; 
// import { JwtService } from "@nestjs/jwt";
import { AuthService } from "src/auth/auth.service";
import { Reflector } from "@nestjs/core";
 

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }
    
    const token = authHeader.split(' ')[1];
    try {
      const user = await this.authService.validateToken(token); 
      request.user = user; 
      return true;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token has expired');
      } else if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid Token');
      } else {
        throw new UnauthorizedException('Authentication failed');
      }
    }
  }
}





export const GetUserId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    return req.user._id;
    
  },
);



export function Auth() {
    return applyDecorators(UseGuards(AuthGuard));
}