import { Controller, Get, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { Worker } from './worker.entity';
import { AuthGuard } from './auth.guard'; 
import { ResponseSerializerInterceptor } from './worker.interceptor';

@Controller("workers")
@UseGuards(AuthGuard)
@UseInterceptors(ResponseSerializerInterceptor)
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Get()
  getHello(): string {
    return this.workerService.getWorkers();
  }

  @Get(":employee_id")
  getWorkerId(@Param('employee_id') id: string): Worker {
    return this.workerService.getWorkerById(id);
  }
}
