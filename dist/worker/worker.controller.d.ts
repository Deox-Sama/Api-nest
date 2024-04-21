import { WorkerService } from './worker.service';
import { Worker } from './worker.entity';
export declare class WorkerController {
    private readonly workerService;
    constructor(workerService: WorkerService);
    getHello(): string;
    getWorkerId(id: string): Worker;
}
