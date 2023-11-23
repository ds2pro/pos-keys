import { checkSchema } from 'express-validator';
import { validateArrayOfIntegers } from './common.validator';

const commonCreateEditRoles: any = {
  name: {
    in: 'body',
    isString: {
      errorMessage: 'name should be a string',
    },
    isLength: {
      errorMessage: 'name should be not be empty and must be between 1 and 50 characters',
      options: { min: 1, max: 50 },
    },
  },
  description: {
    optional: {
      options: {
        nullable: true,
      },
    },
    custom: {
      options: value => {
        if (value !== null && value !== undefined) {
          if (typeof value !== 'string') {
            throw new Error('abbreviation should be a string');
          }
          if (value.length < 1 || value.length > 500) {
            throw new Error('abbreviation should be between 1 and 500 characters');
          }
        }
        return true;
      },
    },
  },
  isActive: {
    in: 'body',
    isBoolean: {
      errorMessage: 'isActive should be boolean',
    },
    toBoolean: true,
  },
  isSystem: {
    in: 'body',
    isBoolean: {
      errorMessage: 'isSystem should be boolean',
    },
    toBoolean: true,
  },
  permissionIds: {
    custom: {
      options: value => {
        return validateArrayOfIntegers(value,'permissionIds');
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
        return validateArrayOfIntegers(value,'userIds');
      },
    },
  },
});
