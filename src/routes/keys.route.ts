import { Route } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import checkPermissionsMiddleware from '@/middlewares/check-permissions.middleware';
import { Resource } from '@/permissions';
import KeysController from '@/controllers/keys.controller';
import { errorHandlerValidator } from '@/validators/error-handler.validator';

import { activateKeyValidator, createKeyValidator, deactivateKeyValidator } from '@/validators/keys.validator';
class KeysRoute extends Route {
  configureRoutes() {
    this.router
      .route('/')
      .get(authMiddleware, checkPermissionsMiddleware(Resource.KEY), KeysController.getKeys)
      .post(authMiddleware, createKeyValidator, errorHandlerValidator, checkPermissionsMiddleware(Resource.KEY), KeysController.createKey);
    this.router.route('/:key').get(authMiddleware, checkPermissionsMiddleware(Resource.KEY), KeysController.getKey);
    this.router.route('/activate').post(activateKeyValidator, errorHandlerValidator, KeysController.activateKey);
    this.router
      .route('/deactivate')
      .post(authMiddleware, checkPermissionsMiddleware(Resource.KEY), deactivateKeyValidator, errorHandlerValidator, KeysController.deactivateKey);
  }
  getPath(): string {
    return '/keys';
  }
}
export default KeysRoute;
