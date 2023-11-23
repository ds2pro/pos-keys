import { HttpException } from '@/exceptions/HttpException';
import { checkSchema } from 'express-validator';

const createKey :any ={
  customerId: {
    in : 'body',
    isInt: {
      options: {
        gt: 0,
      },
      errorMessage: 'customerId should be a strictly positive number',
    },
    toInt: true,
  },

  period: {
    in: 'body',
    isInt: {
      errorMessage: 'period should be an integer',
    },
    custom: {
        options: (value: number) => {
          if (value === -1 || value > 0) {
            return true;
          }
            return false;
        },
        errorMessage: 'period should be -1 or greater than zero'
    },
    toInt: true,
  },

  expiry: {
    in: 'body',
    isInt: {
      errorMessage: 'expiry should be an integer',
    },
    custom: {
        options: (value: number) => {
          if (value === -1 || value > 0) {
            return true;
          }
            return false;
        },
        errorMessage: 'expiry should be -1 or greater than zero'
    },
    toInt: true,
  },
}

export const createKeyValidator = checkSchema(createKey);

export const activateKeyValidator = checkSchema({
  key: {
    in: 'body',
    isString: {
      errorMessage: 'key should be a string',
    },
    isLength: {
      errorMessage: 'key should be not be empty',
      options: { min: 1 , max:50},
    },
  },
});

export const deactivateKeyValidator = checkSchema({
  key: {
    in: 'body',
    isString: {
      errorMessage: 'key should be a string',
    },
    isLength: {
      errorMessage: 'key should be not be empty',
      options: { min: 1 , max:50},
    },
  },
});

export const getEncryptedKeyValidator = checkSchema({
  key: {
    in: 'body',
    isString: {
      errorMessage: 'key should be a string',
    },
    isLength: {
      errorMessage: 'key should be not be empty',
      options: { min: 1 , max:50},
    },
  },
  iv: {
    in: 'body',
    isString: {
      errorMessage: 'iv should be a string',
    },
    isLength: {
      errorMessage: 'iv should be not be empty',
      options: { min: 1 , max:50},
    },
  },
  licenseKey: {
    in: 'body',
    isString: {
      errorMessage: 'licenseKey should be a string',
    },
    isLength: {
      errorMessage: 'licenseKey should be not be empty',
      options: { min: 1 , max:50},
    },
  },
});
