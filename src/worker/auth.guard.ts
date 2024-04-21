import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import axios from 'axios';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpException('Accès refusé: Aucun token fournis', HttpStatus.UNAUTHORIZED); //erreur 401
    }

    const token = authHeader.slice(7); // Remove "Bearer " prefix

    try {
      const response = await axios.get(`http://localhost:4500/introspect?token=${encodeURIComponent(token)}`);
      const data = response.data;

      if (data.success && data.data && data.data.name === 'corentin') {
        request['user'] = data.data; // Stocke le payload pour que je l'utilise dans mon interceptor
        return true; 
      } else {
        throw new HttpException('Accès refusé', HttpStatus.FORBIDDEN); //erreur 403
      }
    } catch (error) {
      throw new HttpException('Accès refusé', HttpStatus.FORBIDDEN); //erreur 403
    }
  }
}
