import { checkSchema } from 'express-validator';

export const loginValidator = checkSchema({
  userName: {
    in: 'body',
    isString: {
      errorMessage: 'Username should be a string',
    },
    isLength: {
      errorMessage: 'Username should be not be empty',
      options: { min: 1 },
    },
  },
  password: {
    in: 'body',
    isString: {
      errorMessage: 'Password should be a string',
    },
    isLength: {
      errorMessage: 'Password should not be empty',
      options: { min: 1 },
    },
  },
});
export const checkAdminValidator = checkSchema({
  userName: {
    in: 'body',
    isString: {
      errorMessage: 'UserName should be a string',
    },
    isLength: {
      errorMessage: 'UserName should be not be empty',
      options: { min: 1 },
    },
  },
  password: {
    in: 'body',
    isString: {
      errorMessage: 'Password should be a string',
    },
    isLength: {
      errorMessage: 'Password should not be empty',
      options: { min: 1 },
    },
  },
});
