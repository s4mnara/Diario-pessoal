import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReflexaoDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  conteudo: string;

  @IsOptional()
  @IsString()
  humor?: string;
}
