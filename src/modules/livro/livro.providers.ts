import { DataSource } from "typeorm";
import { Livro } from "./entities/livro.entity";

export const LivroProviders = [
  {
    provide: "LIVRO_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Livro),
    inject: ["DATA_SOURCE"],
  },
];
