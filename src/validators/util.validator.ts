import { checkSchema } from 'express-validator';

export const encryptTextValidator = checkSchema({
  key: {
    in: 'body',
    isString: {
      errorMessage: 'key should be a string',
    },
    isLength: {
      errorMessage: 'key should not be empty and must contain between 1 and 500 characters',
      options: { min: 1, max: 500 },
    },
  },
  iv: {
    in: 'body',
    isString: {
      errorMessage: 'iv should be a string',
    },
    isLength: {
      errorMessage: 'iv should not be empty and must contain between 1 and 500 characters',
      options: { min: 1, max: 500 },
    },
  },
  text: {
    in: 'body',
    isString: {
      errorMessage: 'text should be a string',
    },
    isLength: {
      errorMessage: 'text should not be empty and must contain between 1 and 500 characters',
      options: { min: 1, max: 500 },
    },
  },
});

export const decryptTextValidator = checkSchema({
  key: {
    in: 'body',
    isString: {
      errorMessage: 'key should be a string',
    },
    isLength: {
      errorMessage: 'key should not be empty and must contain between 1 and 500 characters',
      options: { min: 1, max: 500 },
    },
  },
  iv: {
    in: 'body',
    isString: {
      errorMessage: 'iv should be a string',
    },
    isLength: {
      errorMessage: 'iv should not be empty and must contain between 1 and 500 characters',
      options: { min: 1, max: 500 },
    },
  },
  text: {
    in: 'body',
    isString: {
      errorMessage: 'text should be a string',
    },
    isLength: {
      errorMessage: 'text should not be empty and must contain between 1 and 500 characters',
      options: { min: 1, max: 500 },
    },
  },
});
