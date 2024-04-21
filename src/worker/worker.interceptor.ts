import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseSerializerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request['user'];
    const scope = user ? user.scope : null;

    return next.handle().pipe(
      map(data => {
        if (Array.isArray(data)) {
          return data.map(item => this.serialize(item, scope));
        } else {
          return this.serialize(data, scope);
        }
      })
    );
  }

  serialize(worker, scope) {
    if (scope === 'identity') {
      const { monthly_salary, ...result } = worker;
      return result;
    } else if (scope === 'payroll') {
      const { national_id_number, ...result } = worker;
      return result;
    } else {
      const { national_id_number, monthly_salary, ...result } = worker;
      return result;
    }
  }
}
