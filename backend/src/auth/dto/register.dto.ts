import { IsEmail, IsNotEmpty, IsString, MinLength, IsInt, Min } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  senha: string;

  @IsInt()
  @Min(1)
  idade: number;
}
