import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Worker } from './worker.entity';


@Injectable()
export class WorkerService {

    getWorkerById(employeeId: string): Worker | undefined {
        const fileContent = fs.readFileSync('./ressource/worker.json', 'utf8');
        return JSON.parse(fileContent).find(worker => worker.employee_id === employeeId);
    }

    getWorkers(): any {
        const fileContent = fs.readFileSync('./ressource/worker.json', 'utf8');
        return JSON.parse(fileContent);
    }
}
