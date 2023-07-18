import { checkSchema } from 'express-validator';

export const loginValidator = checkSchema({
  userName: {
    in: 'body',
    isString: {
      errorMessage: 'should be a string',
    },
    isLength: {
      errorMessage: 'should be not be empty',
      options: { min: 1 },
    },
  },
  password: {
    in: 'body',
    isString: {
      errorMessage: 'should be a string',
    },
    isLength: {
      errorMessage: 'should not be empty',
      options: { min: 1 },
    },
  },
});
export const checkAdminValidator = checkSchema({
  userName: {
    in: 'body',
    isString: {
      errorMessage: 'should be a string',
    },
    isLength: {
      errorMessage: 'should be not be empty',
      options: { min: 1 },
    },
  },
  password: {
    in: 'body',
    isString: {
      errorMessage: 'should be a string',
    },
    isLength: {
      errorMessage: 'should not be empty',
      options: { min: 1 },
    },
  },
});
