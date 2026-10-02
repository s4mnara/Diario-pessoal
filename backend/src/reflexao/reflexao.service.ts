import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reflexao } from './entity/reflexao.entity';
import { CreateReflexaoDto } from './dto/create-reflexao.dto';
import { UpdateReflexaoDto } from './dto/update-reflexao.dto';

@Injectable()
export class ReflexaoService {
  constructor(
    @InjectRepository(Reflexao)
    private readonly reflexaoRepo: Repository<Reflexao>,
  ) {}

  create(usuarioId: number, dto: CreateReflexaoDto) {
    const reflexao = this.reflexaoRepo.create({ ...dto, usuarioId });
    return this.reflexaoRepo.save(reflexao);
  }

  findAll(usuarioId: number) {
    return this.reflexaoRepo.find({
      where: { usuarioId },
      order: { atualizadoEm: 'DESC' },
    });
  }

  async findOne(id: number, usuarioId: number) {
    const reflexao = await this.reflexaoRepo.findOneBy({ id });
    if (!reflexao) throw new NotFoundException(`Reflexão ${id} não encontrada.`);
    if (reflexao.usuarioId !== usuarioId) throw new ForbiddenException();
    return reflexao;
  }

  async update(id: number, usuarioId: number, dto: UpdateReflexaoDto) {
    const reflexao = await this.findOne(id, usuarioId);
    this.reflexaoRepo.merge(reflexao, dto);
    return this.reflexaoRepo.save(reflexao);
  }

  async remove(id: number, usuarioId: number) {
    await this.findOne(id, usuarioId);
    await this.reflexaoRepo.delete(id);
  }
}
