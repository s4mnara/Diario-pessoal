import { IsEmail, IsInt, IsNotEmpty, IsString, Min, MinLength } from 'class-validator';

export class UsuarioDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsInt()
  @Min(1)
  idade: number;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  senha: string;
}
