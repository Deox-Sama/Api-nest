"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const child_process_1 = require("child_process");
let AuthMiddleware = class AuthMiddleware {
    use(req, res, next) {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            console.log('Aucun token fourni');
            next();
            return;
        }
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
        if (!token) {
            console.log('Le header Authorization n\'est pas formaté correctement');
            next();
            return;
        }
        const command = `curl -s http://localhost:4500/introspect?token=${encodeURIComponent(token)}`;
        (0, child_process_1.exec)(command, (error, stdout, stderr) => {
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
                }
                else {
                    console.log('Accès non autorisé ou utilisateur non Corentin');
                    res.status(403).send('Forbidden: Access is denied');
                }
            }
            catch (parseError) {
                console.error('Erreur d\'analyse de la réponse:', parseError);
                next();
            }
        });
    }
};
exports.AuthMiddleware = AuthMiddleware;
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, common_1.Injectable)()
], AuthMiddleware);
//# sourceMappingURL=auth.middleware.js.map