import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableGroup1680870857172 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(` 
                      CREATE TABLE acesso."group" (
                        id uuid NOT NULL DEFAULT uuid_generate_v4(),
                        name varchar NOT NULL,
                        create_at timestamp NOT NULL DEFAULT now(),
                        update_at timestamp NOT NULL DEFAULT now(),
                        deleted_at timestamp NULL,
                        PRIMARY KEY (id),
                        UNIQUE(name)
                      );
                    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                      DROP TABLE IF EXISTS acesso.group;
                    `);
  }
}
