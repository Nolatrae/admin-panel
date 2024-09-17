import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
// import { EmailModule } from "./email/email.module";
import { MediaModule } from "./media/media.module";
import { SettingsModule } from "./settings/settings.module";
import { StatisticsModule } from "./statistics/statistics.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    MediaModule,
    // EmailModule,
    SettingsModule,
    StatisticsModule,
  ],
})
export class AppModule {}
