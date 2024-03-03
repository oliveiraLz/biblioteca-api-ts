import { Livro } from "../entities/livro.entity";

export class FindAllLivroDto {
  id: string;
  titulo: string;
  autor: string;
  disponivel: boolean;

  constructor(livro: Livro) {
    this.id = livro.id;
    this.titulo = livro.titulo;
    this.autor = livro.autor;
    this.disponivel = livro.disponivel;
  }
}
