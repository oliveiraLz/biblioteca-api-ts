import { Controller, Get, UseGuards } from "@nestjs/common";
import { RoleService } from "./role.service";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../../guards/auth.guard";
import { RoleGuard } from "../../guards/role.guard";

@UseGuards(AuthGuard, RoleGuard)
@Controller("roles")
@ApiTags("Roles")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Get()
  async findAll() {
    return await this.roleService.findAll();
  }

  //   @Get(':id')
  //   async show(@Param('id', new ParseUUIDPipe()) id: string) {
  //     return await this.roleService.findOne(id);
  //   }
}

// @Post()
// async create(@Body() body: CreateRoleDto) {
//   return await this.roleService.create(body);
// }

// @Put(':id')
// async update(
//   @Param('id', new ParseUUIDPipe()) id: string,
//   @Body() body: UpdateRoleDto,
// ) {
//   return await this.roleService.update(id, body);
// }

// @Delete(':id')
// @HttpCode(HttpStatus.NO_CONTENT)
// async delete(@Param('id', new ParseUUIDPipe()) id: string) {
//   await this.roleService.delete(id);
// }
