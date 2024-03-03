import { Injectable } from "@nestjs/common";
import { CreateLivroDto } from "./dto/create-livro.dto";
import { LivroRepository } from "./livro.repository";
import { FindAllLivroDto } from "./dto/findAll-livro.dto";
import { Livro } from "./entities/livro.entity";
import { UpdateLivroDto } from "./dto/update-livro.dto";

@Injectable()
export class LivroService {
  constructor(private livroRepository: LivroRepository) {}

  async create(data: CreateLivroDto) {
    return await this.livroRepository.create(data);
  }

  async findAll() {
    const livros: Livro[] = await this.livroRepository.findAll();
    return livros.map((livro) => {
      return new FindAllLivroDto(livro);
    });
  }

  async findOne(id: string) {
    const livro = await this.livroRepository.findOne(id);
    return new FindAllLivroDto(livro);
  }

  async update(id: string, update: UpdateLivroDto) {
    const livro = await this.findOne(id);
    livro.autor = update.autor;
    livro.titulo = update.titulo;
    livro.disponivel = update.disponivel;

    return await this.livroRepository.save(livro);
  }

  async remove(id: string) {
    const livro = await this.livroRepository.findOne(id);
    return await this.livroRepository.delete(livro);
  }
}
