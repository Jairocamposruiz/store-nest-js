import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { LoginDto } from '../dtos/auth.dtos';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { PayloadToken } from '../models/token.model';
import { AuthService } from '../services/auth.service';
import { User } from '../../users/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() payload: LoginDto, @Req() req: Request) {
    const user = req.user as User;
    return this.authService.generateJWT(user);
  }

  @ApiOperation({ summary: 'Refresh token' })
  @UseGuards(JwtAuthGuard)
  @Get('refresh')
  async refresh(@Req() req: Request) {
    const { sub } = req.user as PayloadToken;
    return this.authService.refreshJWT(sub);
  }
}
