import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

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

    const { senha, ...safe } = usuario as any;
    return { message: 'Usuário registrado com sucesso', usuario: safe };
  }

  async validateUser(email: string, senha: string) {
    const usuario = await this.usuarioService.findByEmail(email);
    if (!usuario) return null;

    const isPasswordValid = await bcrypt.compare(senha, usuario.senha);
    if (!isPasswordValid) return null;

    const { senha: _s, ...safe } = usuario as any;
    return safe;
  }

  async generateToken(usuario: any) {
    const payload = {
      sub: usuario.id,
      email: usuario.email,
      nome: usuario.nome,
    };
    return { access_token: this.jwtService.sign(payload) };
  }

  async updateProfile(userId: number, dto: UpdateProfileDto) {
    const usuario = await this.usuarioService.findOne(userId);
    if (!usuario) throw new NotFoundException('Usuário não encontrado.');

    if (dto.email && dto.email !== usuario.email) {
      const existing = await this.usuarioService.findByEmail(dto.email);
      if (existing) throw new ConflictException('E-mail já cadastrado.');
      usuario.email = dto.email;
    }

    if (dto.nome) usuario.nome = dto.nome;

    if (dto.senha) {
      usuario.senha = await bcrypt.hash(dto.senha, 10);
    }

    const saved = await this.usuarioService.save(usuario);
    const { senha, ...safe } = saved as any;
    return safe;
  }
}
