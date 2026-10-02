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
import { ReflexaoService } from './reflexao.service';
import { CreateReflexaoDto } from './dto/create-reflexao.dto';
import { UpdateReflexaoDto } from './dto/update-reflexao.dto';

@Controller('reflexoes')
@UseGuards(AuthGuard('jwt'))
export class ReflexaoController {
  constructor(private readonly reflexaoService: ReflexaoService) {}

  private userId(req: Request): number {
    return (req.user as { id: number }).id;
  }

  @Post()
  create(@Req() req: Request, @Body() dto: CreateReflexaoDto) {
    return this.reflexaoService.create(this.userId(req), dto);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.reflexaoService.findAll(this.userId(req));
  }

  @Get(':id')
  findOne(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    return this.reflexaoService.findOne(id, this.userId(req));
  }

  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReflexaoDto,
  ) {
    return this.reflexaoService.update(id, this.userId(req), dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    return this.reflexaoService.remove(id, this.userId(req));
  }
}
