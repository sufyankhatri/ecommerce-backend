import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Query } from '@nestjs/graphql';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Query()
  login(@Req() req: Request): Promise<{ access_token: string }> {
    return this.authService.login(req.user);
  }
}
