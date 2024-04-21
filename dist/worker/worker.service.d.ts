import { Worker } from './worker.entity';
export declare class WorkerService {
    getWorkerById(employeeId: string): Worker | undefined;
    getWorkers(): any;
}
