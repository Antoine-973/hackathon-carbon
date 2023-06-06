import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { FormationModule } from './formation/formation.module';
import { TopicModule } from './topic/topic.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [FormationModule, TopicModule, ClientModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
