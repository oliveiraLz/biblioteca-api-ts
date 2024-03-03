import { Module } from "@nestjs/common";
import { LivroService } from "./livro.service";
import { LivroController } from "./livro.controller";
import { DatabaseModule } from "src/database/database.module";
import { AuthModule } from "../auth/auth.module";
import { LivroRepository } from "./livro.repository";
import { LivroProviders } from "./livro.providers";

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [LivroController],
  providers: [...LivroProviders, LivroService, LivroRepository],
  exports: [LivroRepository],
})
export class LivroModule {}
