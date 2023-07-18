import { RequestWithUser } from '@interfaces/auth.interface';
import { HttpException } from '@exceptions/HttpException';

const resolveCurrentOperation = (method: string) => {
  switch (method) {
    case 'PUT':
    case 'PATCH':
      return 'edit';
    case 'GET':
      return 'read';
    case 'POST':
      return 'create';
    case 'DELETE':
      return 'delete';
  }
  throw new HttpException(400, `Method ${method} not taking into consideration for permissions`);
};

const checkPermissionsMiddleware = (resourceName: string) => {
  return (req: RequestWithUser, res: any, next: any) => {
    if (req.user.role.keyName === 'owner') {
      return next();
    }
    const currentOperationKey = resolveCurrentOperation(req.method);
    const found = req.user.permissions.filter(permission => {
      return permission.operationName === currentOperationKey && permission.resourceName === resourceName;
    });
    if (found.length > 0) {
      return next();
    }
    return next(new HttpException(403, "You're not allowed to access this resource"));
  };
};

export default checkPermissionsMiddleware;
