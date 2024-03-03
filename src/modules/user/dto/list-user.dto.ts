import { ListGroupDto } from "../../group/dto/list-group.dto";

export class ListUserDto {
  id_user: string;
  name: string;
  email: string;
  groups: ListGroupDto[];

  constructor(id_user, name, email, groups) {
    this.id_user = id_user;
    this.name = name;
    this.email = email;
    this.groups = groups;
  }
}
