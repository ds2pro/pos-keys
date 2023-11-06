import { ADDRESS_LENGTH, CUSTOM_NAME, DOB, EMAIL, ID, IS_ACTIVE, STRICTLY_POSITIVE_NUMBER } from './common.validator';
import { checkSchema } from 'express-validator';
const commonCreateEditCustomer: any = {
  name: CUSTOM_NAME(50),
  abbreviation: {
    optional: {
      options: {
        nullable: true,
      },
    },
    ...CUSTOM_NAME(20),
  },
  email: {
    optional: {
      options: {
        nullable: true,
      },
    },
    ...EMAIL,
  },
  phone: CUSTOM_NAME(20),
  mobile: {
    optional: {
      options: {
        nullable: true,
      },
    },
    ...CUSTOM_NAME(20),
  },
  isActive: {
    optional: {
      options: {
        nullable: true,
      },
    },
    ...IS_ACTIVE,
  },
};

const editUserCustomer: any = {
  id: ID,
  ...commonCreateEditCustomer,
};

export const editCustomerValidator = checkSchema(editUserCustomer);
export const createCustomerValidator = checkSchema(commonCreateEditCustomer);
