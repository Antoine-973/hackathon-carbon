import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { PassModule } from './pass/pass.module';
import { StageModule } from './stage/stage.module';
import { RewardModule } from './reward/reward.module';
import { EventsModule } from './events/events.module';
import { FormationModule } from './formation/formation.module';
import { TopicModule } from './topic/topic.module';
import { ClientModule } from './client/client.module';
import { CommentModule } from './comment/comment.module';
import { MissionModule } from './mission/mission.module';
import { RolesGuard } from './user/role/guard/role.guard';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    FormationModule,
    TopicModule,
    ClientModule,
    EventsModule,
    PassModule,
    StageModule,
    RewardModule,
    UserModule,
    PrismaModule,
    AuthenticationModule,
    MissionModule,
    CommentModule,
    ArticleModule
  ],
  controllers: [AppController],
  providers: [
    // {
    //   provide: 'APP_GUARD',
    //   useClass: RolesGuard,
    // },
    AppService,
  ],
})
export class AppModule {}
