import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from "@nestjs/common";
import { LivroService } from "./livro.service";
import { CreateLivroDto } from "./dto/create-livro.dto";
import { UpdateLivroDto } from "./dto/update-livro.dto";

@Controller("livro")
export class LivroController {
  constructor(private readonly livroService: LivroService) {}

  @Post()
  create(@Body() createLivroDto: CreateLivroDto) {
    return this.livroService.create(createLivroDto);
  }

  @Get()
  async findAll() {
    return this.livroService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.livroService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateLivroDto: UpdateLivroDto) {
    return this.livroService.update(id, updateLivroDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.livroService.remove(id);
  }
}
