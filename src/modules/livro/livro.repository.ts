import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Livro } from "./entities/livro.entity";
import { CreateLivroDto } from "./dto/create-livro.dto";

@Injectable()
export class LivroRepository {
  constructor(
    @Inject("LIVRO_REPOSITORY")
    private repository: Repository<Livro>
  ) {}

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    const livro = await this.repository.findOne({ where: { id: id } });
    if (!livro) {
      throw new NotFoundException(`O livro com o id ${id} não foi encontrado`);
    }

    return livro;
  }

  async create(data: CreateLivroDto) {
    const newLivro = this.repository.create(data);
    newLivro.disponivel = true;
    return await this.save(newLivro);
  }

  async save(data: any) {
    return await this.repository.save(data);
  }

  async delete(livro: Livro) {
    return await this.repository.remove(livro);
  }
}
