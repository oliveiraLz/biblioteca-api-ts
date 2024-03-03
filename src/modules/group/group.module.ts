import { forwardRef, Module } from "@nestjs/common";
import { GroupController } from "./group.controller";
import { GroupService } from "./group.service";
import { DatabaseModule } from "../../database/database.module";
import { GroupProviders } from "./group.providers";
import { UsersService } from "../user/user.service";
import { RoleService } from "../role/role.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [GroupController],
  providers: [...GroupProviders, GroupService, UsersService, RoleService],
  exports: [GroupService],
})
export class GroupModule {}
