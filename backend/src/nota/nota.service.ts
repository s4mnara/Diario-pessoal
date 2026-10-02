import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nota } from './entity/nota.entity';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';

@Injectable()
export class NotaService {
  constructor(
    @InjectRepository(Nota)
    private readonly notaRepo: Repository<Nota>,
  ) {}

  create(usuarioId: number, dto: CreateNotaDto) {
    const nota = this.notaRepo.create({ ...dto, usuarioId });
    return this.notaRepo.save(nota);
  }

  findAll(usuarioId: number) {
    return this.notaRepo.find({
      where: { usuarioId },
      order: { atualizadoEm: 'DESC' },
    });
  }

  async findOne(id: number, usuarioId: number) {
    const nota = await this.notaRepo.findOneBy({ id });
    if (!nota) throw new NotFoundException(`Nota ${id} não encontrada.`);
    if (nota.usuarioId !== usuarioId) throw new ForbiddenException();
    return nota;
  }

  async update(id: number, usuarioId: number, dto: UpdateNotaDto) {
    const nota = await this.findOne(id, usuarioId);
    this.notaRepo.merge(nota, dto);
    return this.notaRepo.save(nota);
  }

  async remove(id: number, usuarioId: number) {
    await this.findOne(id, usuarioId);
    await this.notaRepo.delete(id);
  }
}
