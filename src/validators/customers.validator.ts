import { EMAIL } from './common.validator';
import { checkSchema } from 'express-validator';
const commonCreateEditCustomer: any = {
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
  abbreviation: {
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
          if (value.length < 1 || value.length > 20) {
            throw new Error('abbreviation should be between 1 and 20 characters');
          }
        }
        return true;
      },
    },
  },
  email: {
    optional: {
      options: {
        nullable: true,
      },
    },
    ...EMAIL,
  },
  phone: {
    in: 'body',
    isString: {
      errorMessage: 'phone should be a string',
    },
    isLength: {
      errorMessage: 'phone should be not be empty',
      options: { min: 1, max: 20 },
    },  
  },
  mobile: {
    optional: {
      options: {
        nullable: true,
      },
    },
    custom: {
      options: value => {
        if (value !== null && value !== undefined) {
          if (typeof value !== 'string') {
            throw new Error('mobile should be a string');
          }
          if (value.length < 1 || value.length > 20) {
            throw new Error('mobile should be between 1 and 20 characters');
          }
        }
        return true;
      },
    },
  },
  isActive: {
    optional: {
      options: {
        nullable: true,
      },
    },
    custom: {
      options: (value, { req }) => {
        if (req.body.isActive !== null && req.body.isActive !== undefined) {
          return typeof value === 'boolean';
        }
        return true;
      },
      errorMessage: 'isActive should be a boolean if provided',
    },
  },
};

const editUserCustomer: any = {
  id: {
    in: 'params',
    isInt: {
      errorMessage: 'Id should be a number',
    },
    trim: {
      options: [' '],
    },
  },
  ...commonCreateEditCustomer,
};

export const editCustomerValidator = checkSchema(editUserCustomer);
export const createCustomerValidator = checkSchema(commonCreateEditCustomer);
