import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { AuthMiddleware } from './auth.middleware';

@Module({
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkerModule implements NestModule {
  configure() {


  }
}
