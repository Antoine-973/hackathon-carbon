import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormationModule } from './formation/formation.module';

@Module({
  imports: [FormationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
