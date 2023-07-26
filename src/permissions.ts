export enum Resource {
  ROLE = 'role',
  USER = 'user',
  CUSTOMER = 'customer',
  KEY = 'key',
}

export const PermissionNameBuilder = (resource: string, operation: string) => {
  return resource.concat('.').concat(operation);
};
