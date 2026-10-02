import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { NotaService } from './nota.service';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';

@Controller('notas')
@UseGuards(AuthGuard('jwt'))
export class NotaController {
  constructor(private readonly notaService: NotaService) {}

  private userId(req: Request): number {
    return (req.user as { id: number }).id;
  }

  @Post()
  create(@Req() req: Request, @Body() dto: CreateNotaDto) {
    return this.notaService.create(this.userId(req), dto);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.notaService.findAll(this.userId(req));
  }

  @Get(':id')
  findOne(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    return this.notaService.findOne(id, this.userId(req));
  }

  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateNotaDto,
  ) {
    return this.notaService.update(id, this.userId(req), dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    return this.notaService.remove(id, this.userId(req));
  }
}
