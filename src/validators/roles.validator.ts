import { checkSchema } from 'express-validator';
import { BOOLEAN, CUSTOM_NAME, NAME, validateArrayOfIntegers } from './common.validator';

const commonCreateEditRoles: any = {
  name: NAME,
  description: {
    optional: {
      options: {
        nullable: true,
      },
    },
    ...CUSTOM_NAME(500),
  },
  isActive: BOOLEAN,
  isSystem: BOOLEAN,
  permissionIds: {
    custom: {
      options: value => {
        return validateArrayOfIntegers(value);
      },
    },
  },
};
export const createRoleValidator = checkSchema(commonCreateEditRoles);
export const editRoleValidator = checkSchema(commonCreateEditRoles);

export const addUsersToRoleValidator = checkSchema({
  userIds: {
    custom: {
      options: value => {
        return validateArrayOfIntegers(value);
      },
    },
  },
});
