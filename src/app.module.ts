import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { FeatureModule } from "./modules/feature/feature.module";
import { ApplicationModule } from "./modules/application/application.module";
import { ApplicationGroupModule } from "./modules/application_group/application_group.module";
import { GroupModule } from "./modules/group/group.module";
import { RoleModule } from "./modules/role/role.module";
import { TenantModule } from "./modules/tenant/tenant.module";
import { DatabaseModule } from "./database/database.module";
import { ScheduleModule } from "@nestjs/schedule";
import { LivroModule } from "./modules/livro/livro.module";

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    ApplicationModule,
    ApplicationGroupModule,
    FeatureModule,
    GroupModule,
    RoleModule,
    TenantModule,
    UserModule,
    ScheduleModule.forRoot(),
    LivroModule,
  ],
  providers: [],
})
export class AppModule {}
