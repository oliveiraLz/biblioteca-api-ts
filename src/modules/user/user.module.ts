import { forwardRef, Module } from "@nestjs/common";
import { UsersService } from "./user.service";
import { UserController } from "./user.controller";
import { UsersProviders } from "./user.providers";
import { DatabaseModule } from "../../database/database.module";
import { AuthModule } from "../auth/auth.module";
import { GroupService } from "../group/group.service";
import { RoleService } from "../role/role.service";

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [...UsersProviders, UsersService, GroupService, RoleService],
  exports: [UsersService],
})
export class UserModule {}
