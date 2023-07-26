import { CUSTOM_NAME, STRICTLY_POSITIVE_NUMBER, TIME_PERIOD } from './common.validator';
import { checkSchema } from 'express-validator';

export const createKeyValidator = checkSchema({
  customerId: {
    optional: {
      options: {
        nullable: true,
      },
    },
    ...STRICTLY_POSITIVE_NUMBER,
  },
  period: TIME_PERIOD,
});

export const activateKeyValidator = checkSchema({
  key: CUSTOM_NAME(50),
});
