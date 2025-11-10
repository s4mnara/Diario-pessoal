import { Body, Controller,Delete,Get,HttpCode,Param,Patch,Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioDto } from './dto/usuario.dto';
import { Usuario } from './entity/usuario.entity';


@Controller('usuario')
export class UsuarioController {
   constructor(private readonly usuarioService: UsuarioService){}


   @Post()
   create(@Body() usuarioData: UsuarioDto){
       return this.usuarioService.create(usuarioData);
   }


   @Get()
   findAll(): Promise<Usuario[]> {
       return this.usuarioService.findAll();
   }


   @Get(':id')
   findOne(@Param('id') id: number): Promise<Usuario>{
       return this.usuarioService.findOne(id);
   }


   @Patch(':id')
   update(@Param('id') id: number, @Body() updateDto: UsuarioDto): Promise<Usuario>{
       return this.usuarioService.update(id, updateDto);
   }


   @Delete(':id')
   @HttpCode(204)
   remove(@Param('id') id: number): Promise<void> {
       return this.usuarioService.remove(id);
   }
}
