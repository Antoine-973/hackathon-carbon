import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassModule } from './pass/pass.module';

@Module({
  imports: [PassModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
