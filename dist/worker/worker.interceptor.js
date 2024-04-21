"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseSerializerInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let ResponseSerializerInterceptor = class ResponseSerializerInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const user = request['user'];
        const scope = user ? user.scope : null;
        return next.handle().pipe((0, operators_1.map)(data => {
            if (Array.isArray(data)) {
                return data.map(item => this.serialize(item, scope));
            }
            else {
                return this.serialize(data, scope);
            }
        }));
    }
    serialize(worker, scope) {
        if (scope === 'identity') {
            const { monthly_salary, ...result } = worker;
            return result;
        }
        else if (scope === 'payroll') {
            const { national_id_number, ...result } = worker;
            return result;
        }
        else {
            const { national_id_number, monthly_salary, ...result } = worker;
            return result;
        }
    }
};
exports.ResponseSerializerInterceptor = ResponseSerializerInterceptor;
exports.ResponseSerializerInterceptor = ResponseSerializerInterceptor = __decorate([
    (0, common_1.Injectable)()
], ResponseSerializerInterceptor);
//# sourceMappingURL=worker.interceptor.js.map