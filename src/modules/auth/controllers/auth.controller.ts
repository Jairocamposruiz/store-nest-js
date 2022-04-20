import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { LoginDto } from '../dtos/auth.dtos';
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

  //TODO: Añadir un endpoint para revalidar el token
}
