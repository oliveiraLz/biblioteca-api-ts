import { ListGroupLoginDto } from "../../group/dto/list-group-login.dto";

export class ListUserLoginDto {
  id: string;
  name: string;
  email: string;
  groups: ListGroupLoginDto[];

  constructor(id, name, email, groups) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.email = groups;
  }
}
