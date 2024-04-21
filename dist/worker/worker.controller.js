"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerController = void 0;
const common_1 = require("@nestjs/common");
const worker_service_1 = require("./worker.service");
const worker_entity_1 = require("./worker.entity");
const auth_guard_1 = require("./auth.guard");
const worker_interceptor_1 = require("./worker.interceptor");
let WorkerController = class WorkerController {
    constructor(workerService) {
        this.workerService = workerService;
    }
    getHello() {
        return this.workerService.getWorkers();
    }
    getWorkerId(id) {
        return this.workerService.getWorkerById(id);
    }
};
exports.WorkerController = WorkerController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], WorkerController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)(":employee_id"),
    __param(0, (0, common_1.Param)('employee_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", worker_entity_1.Worker)
], WorkerController.prototype, "getWorkerId", null);
exports.WorkerController = WorkerController = __decorate([
    (0, common_1.Controller)("workers"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)(worker_interceptor_1.ResponseSerializerInterceptor),
    __metadata("design:paramtypes", [worker_service_1.WorkerService])
], WorkerController);
//# sourceMappingURL=worker.controller.js.map