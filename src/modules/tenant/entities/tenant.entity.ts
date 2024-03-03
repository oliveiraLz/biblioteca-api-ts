import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "../../../decorators/base.entity";
import { GroupsEntity } from "../../group/entities/group.entity";

@Entity({ name: "tenant", schema: "acesso" })
export class TenantEntity extends Base {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  name: string;

  @OneToMany(() => GroupsEntity, (group) => group.tenant, {
    cascade: true,
  })
  groups?: GroupsEntity[];
}
