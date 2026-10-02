import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Get,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const usuario = await this.authService.validateUser(
      loginDto.email,
      loginDto.senha,
    );
    if (!usuario) throw new UnauthorizedException('E-mail ou senha inválidos.');

    const token = await this.authService.generateToken(usuario);
    return { usuario, ...token };
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Patch('profile')
  @UseGuards(AuthGuard('jwt'))
  updateProfile(@Req() req: Request, @Body() dto: UpdateProfileDto) {
    const userId = (req.user as { id: number }).id;
    return this.authService.updateProfile(userId, dto);
  }
}
