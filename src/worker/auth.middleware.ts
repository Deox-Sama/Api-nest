import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { exec } from 'child_process';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      console.log('Aucun token fourni');
      next(); // Aucun token n'est fourni, on laisse passer la requête sans plus de vérification
      return;
    }

    // Extrait le token du header 
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      console.log('Le header Authorization n\'est pas formaté correctement');
      next(); 
      return;
    }

    // Exécute la commande curl pour vérifier le token
    const command = `curl -s http://localhost:4500/introspect?token=${encodeURIComponent(token)}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Erreur d\'exécution de curl:', stderr);
        next(); 
        return;
      }

      try {
        const response = JSON.parse(stdout);
        if (response.success && response.data && response.data.name === 'corentin') {
          console.log('Autorisation réussie pour corentin');
          next(); 
        } else {
          console.log('Accès non autorisé ou utilisateur non Corentin');
          res.status(403).send('Forbidden: Accès refusé'); 
        }
      } catch (parseError) {
        console.error('Erreur d\'analyse de la réponse:', parseError);
        next(); 
      }
    });
  }
}
