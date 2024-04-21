"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
let WorkerService = class WorkerService {
    getWorkerById(employeeId) {
        const fileContent = fs.readFileSync('./ressource/worker.json', 'utf8');
        return JSON.parse(fileContent).find(worker => worker.employee_id === employeeId);
    }
    getWorkers() {
        const fileContent = fs.readFileSync('./ressource/worker.json', 'utf8');
        return JSON.parse(fileContent);
    }
};
exports.WorkerService = WorkerService;
exports.WorkerService = WorkerService = __decorate([
    (0, common_1.Injectable)()
], WorkerService);
//# sourceMappingURL=worker.service.js.map