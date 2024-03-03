import { forwardRef, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { DatabaseModule } from "../../database/database.module";
import { AuthProviders } from "./auth.providers";
import { JwtModule } from "@nestjs/jwt";
import { envs } from "../../common/env-values";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UsersService } from "../user/user.service";
import { RoleService } from "../role/role.service";

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: String(envs.JWT_SECRET),
    }),
  ],
  controllers: [AuthController],
  providers: [...AuthProviders, JwtStrategy, AuthService, UsersService, RoleService],
  exports: [AuthService],
})
export class AuthModule {}
