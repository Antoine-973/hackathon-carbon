import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassModule } from './pass/pass.module';
import { StageModule } from './stage/stage.module';
import { RewardModule } from './reward/reward.module';

@Module({
  imports: [PassModule, StageModule, RewardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
