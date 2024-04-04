import { CUSTOM_NAME, STRICTLY_POSITIVE_NUMBER, TIME_EXPIRY, TIME_PERIOD } from './common.validator';
import { checkSchema } from 'express-validator';

export const createKeyValidator = checkSchema({
  customerId: STRICTLY_POSITIVE_NUMBER,
  period: TIME_PERIOD,
  expiry: TIME_EXPIRY,
});

export const activateKeyValidator = checkSchema({
  key: CUSTOM_NAME(50),
});

export const deactivateKeyValidator = checkSchema({
  key: CUSTOM_NAME(50),
});

export const getEncryptedKeyValidator = checkSchema({
  key: CUSTOM_NAME(50),
  iv: CUSTOM_NAME(50),
  licenseKey: CUSTOM_NAME(50),
});
