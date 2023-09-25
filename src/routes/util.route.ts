import { Route } from '@/interfaces/routes.interface';
import { errorHandlerValidator } from '@/validators/error-handler.validator';
import UtilController from '@/controllers/util.controller';
import { decryptTextValidator, encryptTextValidator } from '@/validators/util.validator';
class UtilRoute extends Route {
  configureRoutes() {
    this.router.route('/encrypt').post(encryptTextValidator, errorHandlerValidator, UtilController.encryptText);
    this.router.route('/decrypt').post(decryptTextValidator, errorHandlerValidator, UtilController.decryptText);
  }
  getPath(): string {
    return '/util';
  }
}
export default UtilRoute;
