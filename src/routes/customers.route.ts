import { Route } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import checkPermissionsMiddleware from '@/middlewares/check-permissions.middleware';
import { Resource } from '@/permissions';
import CustomersController from '@/controllers/customers.controller';
import { errorHandlerValidator } from '@/validators/error-handler.validator';
import customersController from '@/controllers/customers.controller';
import { createCustomerValidator, editCustomerValidator } from '@/validators/customers.validator';
class CustomersRoute extends Route {
  configureRoutes() {
    this.router
      .route('/')
      .get(authMiddleware, checkPermissionsMiddleware(Resource.CUSTOMER), CustomersController.getCustomers)
      .post(
        authMiddleware,
        createCustomerValidator,
        errorHandlerValidator,
        checkPermissionsMiddleware(Resource.CUSTOMER),
        CustomersController.createCustomer,
      );

    this.router.route('/dropdown').get(authMiddleware, checkPermissionsMiddleware(Resource.CUSTOMER), CustomersController.getCustomersDropdown);
    this.router
      .route('/:id')
      .put(
        authMiddleware,
        editCustomerValidator,
        errorHandlerValidator,
        checkPermissionsMiddleware(Resource.CUSTOMER),
        CustomersController.editCustomer,
      )
      .delete(authMiddleware, checkPermissionsMiddleware(Resource.CUSTOMER), customersController.deleteCustomer)
      .get(authMiddleware, checkPermissionsMiddleware(Resource.CUSTOMER), CustomersController.getCustomer);
  }

  getPath(): string {
    return '/customers';
  }
}
export default CustomersRoute;
