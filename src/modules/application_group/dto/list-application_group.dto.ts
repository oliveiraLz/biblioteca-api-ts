import { ListRoleApplicationDto } from "../../role/dto/list-roles_application.dto";

export class ListApplicationGroupDto {
  name: string;
  features: ListRoleApplicationDto[];

  constructor(name, features) {
    this.name = name;
    this.features = features;
  }
}
