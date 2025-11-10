import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existing = await this.usuarioService.findByEmail(registerDto.email);
    if (existing) {
      throw new ConflictException('E-mail já cadastrado.');
    }

    const hashedPassword = await bcrypt.hash(registerDto.senha, 10);
    const usuario = await this.usuarioService.create({
      nome: registerDto.nome,
      email: registerDto.email,
      senha: hashedPassword,
      idade: registerDto.idade,
    });

    return { message: 'Usuário registrado com sucesso', usuario };
  }

  async login(loginDto: LoginDto) {
    const usuario = await this.usuarioService.findByEmail(loginDto.email);
    if (!usuario) throw new UnauthorizedException('E-mail ou senha inválidos.');

    const isPasswordValid = await bcrypt.compare(loginDto.senha, usuario.senha);
    if (!isPasswordValid) throw new UnauthorizedException('E-mail ou senha inválidos.');

    const payload = { sub: usuario.id, email: usuario.email };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
