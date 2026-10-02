import { IsOptional, IsString } from 'class-validator';

export class UpdateReflexaoDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  conteudo?: string;

  @IsOptional()
  @IsString()
  humor?: string;
}
