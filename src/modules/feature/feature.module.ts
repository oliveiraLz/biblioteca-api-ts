import { Module } from "@nestjs/common";
import { FeatureController } from "./feature.controller";
import { FeatureService } from "./feature.service";
import { DatabaseModule } from "../../database/database.module";
import { FeatureProviders } from "./feature.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [FeatureController],
  providers: [...FeatureProviders, FeatureService],
})
export class FeatureModule {}
