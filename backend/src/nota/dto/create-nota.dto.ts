import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotaDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  conteudo: string;
}
