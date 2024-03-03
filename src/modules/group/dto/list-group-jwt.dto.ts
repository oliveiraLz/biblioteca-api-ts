import { ListRoleJwtDto } from "../../role/dto/list-roles-jwt.dto";

export class ListGroupJwtDto {
  id: string;
  name: string;
  admin: boolean;
  role: ListRoleJwtDto[];

  constructor(id, name, role, admin) {
    this.id = id;
    this.name = name;
    this.admin = admin;
    this.role = role.map((r) => new ListRoleJwtDto(r.name));
  }
}
