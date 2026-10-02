import { IsOptional, IsString } from 'class-validator';

export class UpdateNotaDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  conteudo?: string;
}
