import RolesController from '@controllers/roles.controller';
import { Route } from '@interfaces/routes.interface';
import checkPermissionsMiddleware from '@middlewares/check-permissions.middleware';
import { Resource } from '@/permissions';
import authMiddleware from '@middlewares/auth.middleware';
import { addUsersToRoleValidator, createRoleValidator, editRoleValidator } from '@/validators/roles.validator';
import { errorHandlerValidator } from '@/validators/error-handler.validator';

class RolesRoute extends Route {
  configureRoutes(): void {
    this.router
      .route('/')
      .get(authMiddleware, checkPermissionsMiddleware(Resource.ROLE), RolesController.getRoles)
      .post(authMiddleware, createRoleValidator, errorHandlerValidator, checkPermissionsMiddleware(Resource.ROLE), RolesController.createRole);
    this.router.route('/init-permissions').get(authMiddleware, checkPermissionsMiddleware(Resource.ROLE), RolesController.getInitialRolePermissions);
    this.router.route('/dropdown').get(authMiddleware, checkPermissionsMiddleware(Resource.ROLE), RolesController.getRolesDropdown);
    this.router.route('/init-permissions').get(authMiddleware, checkPermissionsMiddleware(Resource.ROLE), RolesController.getInitialRolePermissions);
    this.router
      .route('/:id')
      .get(authMiddleware, checkPermissionsMiddleware(Resource.ROLE), RolesController.getRole)
      .delete(authMiddleware, checkPermissionsMiddleware(Resource.ROLE), RolesController.deleteRole)
      .put(authMiddleware, editRoleValidator, errorHandlerValidator, checkPermissionsMiddleware(Resource.ROLE), RolesController.editRole);
    this.router
      .route('/:id/users')
      .get(authMiddleware, checkPermissionsMiddleware(Resource.ROLE), RolesController.getUsersForRole)
      .post(
        authMiddleware,
        addUsersToRoleValidator,
        errorHandlerValidator,
        checkPermissionsMiddleware(Resource.ROLE),
        RolesController.addUsersToRole,
      );
  }

  getPath(): string {
    return '/roles';
  }
}

export default RolesRoute;
