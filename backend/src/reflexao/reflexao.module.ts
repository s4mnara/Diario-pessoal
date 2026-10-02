import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reflexao } from './entity/reflexao.entity';
import { ReflexaoController } from './reflexao.controller';
import { ReflexaoService } from './reflexao.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reflexao])],
  controllers: [ReflexaoController],
  providers: [ReflexaoService],
})
export class ReflexaoModule {}
