import { Route } from '@/interfaces/routes.interface';
import { errorHandlerValidator } from '@/validators/error-handler.validator';
import UtilController from '@/controllers/util.controller';
import { encryptTextValidator } from '@/validators/util.validator';
class UtilRoute extends Route {
  configureRoutes() {
    this.router.route('/encrypt').post(encryptTextValidator, errorHandlerValidator, UtilController.encryptText);
  }
  getPath(): string {
    return '/util';
  }
}
export default UtilRoute;
