import { Base } from "../../../decorators/base.entity";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ schema: "biblioteca" })
export class Livro extends Base {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", nullable: false })
  titulo: string;

  @Column({ type: "varchar", nullable: false })
  autor: string;

  @Column({ type: "boolean", nullable: false })
  disponivel: boolean;
}
