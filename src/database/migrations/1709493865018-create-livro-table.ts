import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLivroTable1709493865018 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    {
      await queryRunner.query(`
        CREATE SCHEMA IF NOT EXISTS biblioteca;

        CREATE TABLE biblioteca.livro(
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            titulo varchar NOT NULL,
            autor varchar NOT NULL,
            disponivel boolean NOT NULL,
            created_at timestamp NOT NULL DEFAULT now(),
            updated_at timestamp NOT NULL DEFAULT now(),
            deleted_at timestamp NULL,
            PRIMARY KEY (id)
            );
        `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    {
      await queryRunner.query(`
        DROP TABLE IF EXISTS biblioteca.livro;
      `);
    }
  }
}
