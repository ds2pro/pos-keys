import { ADDRESS_LENGTH, CUSTOM_NAME, DOB, EMAIL, ID, STRICTLY_POSITIVE_NUMBER } from './common.validator';
import { checkSchema } from 'express-validator';
const commonCreateEditCustomer: any = {
  typeId: STRICTLY_POSITIVE_NUMBER,
  name: CUSTOM_NAME(50),
  dob: {
    optional: {
      options: {
        nullable: true,
      },
    },
    ...DOB,
  },
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
  countryId: STRICTLY_POSITIVE_NUMBER,
  city: {
    optional: {
      options: {
        nullable: true,
      },
    },
    ...CUSTOM_NAME(50),
  },
  addressLine1: {
    optional: {
      options: {
        nullable: true,
      },
    },
    ...ADDRESS_LENGTH,
  },
  addressLine2: {
    optional: {
      options: {
        nullable: true,
      },
    },
    ...ADDRESS_LENGTH,
  },
  postalCode: {
    optional: {
      options: {
        nullable: true,
      },
    },
    ...CUSTOM_NAME(20),
  },
};

const editUserCustomer: any = {
  id: ID,
  ...commonCreateEditCustomer,
};

export const editCustomerValidator = checkSchema(editUserCustomer);
export const createCustomerValidator = checkSchema(commonCreateEditCustomer);
