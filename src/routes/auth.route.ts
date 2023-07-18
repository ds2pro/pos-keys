import authController from '@controllers/auth.controller';
import { Route } from '@interfaces/routes.interface';
import { checkAdminValidator, loginValidator } from '@/validators/auth.validator';
import { errorHandlerValidator } from '@/validators/error-handler.validator';
import authMiddleware from '@/middlewares/auth.middleware';

class AuthRoute extends Route {
  configureRoutes(): void {
    this.router.route('/').get(authMiddleware, authController.getPermissions);
    this.router.post(`/login`, loginValidator, errorHandlerValidator, authController.logIn);
    this.router.post(`/heartbeat`, authMiddleware, authController.heartbeat);
    this.router.post(`/checkAdmin`, checkAdminValidator, errorHandlerValidator, authController.checkAdmin);
  }

  getPath(): string {
    return '/auth';
  }
}

export default AuthRoute;
