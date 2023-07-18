import UsersController from '@/controllers/users.controller';
import { Route } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import checkPermissionsMiddleware from '@/middlewares/check-permissions.middleware';
import { Resource } from '@/permissions';
import { errorHandlerValidator } from '@/validators/error-handler.validator';
import {
  createUserValidator,
  editUserValidator,
  resetPasswordValidator,
  setUserImageValidator,
  setUserLanguageValidator,
  setUserModeValidator,
} from '@/validators/users.validator';

class UsersRoute extends Route {
  configureRoutes() {
    this.router
      .route('/')
      .get(authMiddleware, checkPermissionsMiddleware(Resource.USER), UsersController.getUsers)
      .post(authMiddleware, createUserValidator, errorHandlerValidator, checkPermissionsMiddleware(Resource.USER), UsersController.createUser);
    this.router.route('/dropdown').get(authMiddleware, checkPermissionsMiddleware(Resource.USER), UsersController.getUsersDropdownList);
    this.router.route('/set-image').put(authMiddleware, setUserImageValidator, errorHandlerValidator, UsersController.setUserImage);
    this.router.route('/set-language').put(authMiddleware, setUserLanguageValidator, errorHandlerValidator, UsersController.setUserLanguage);
    this.router.route('/set-mode').put(authMiddleware, setUserModeValidator, errorHandlerValidator, UsersController.setUserMode);

    this.router
      .route('/:id')
      .put(authMiddleware, editUserValidator, errorHandlerValidator, checkPermissionsMiddleware(Resource.USER), UsersController.editUser)
      .delete(authMiddleware, checkPermissionsMiddleware(Resource.USER), UsersController.deleteUser)
      .get(authMiddleware, checkPermissionsMiddleware(Resource.USER), UsersController.getUser);
    this.router
      .route('/:id/reset-password')
      .post(
        resetPasswordValidator,
        errorHandlerValidator,
        authMiddleware,
        checkPermissionsMiddleware(Resource.USER),
        UsersController.adminResetPassword,
      );
  }

  getPath(): string {
    return '/users';
  }
}

export default UsersRoute;
