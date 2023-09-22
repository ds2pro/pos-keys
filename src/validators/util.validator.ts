import { CUSTOM_NAME } from './common.validator';
import { checkSchema } from 'express-validator';

export const encryptTextValidator = checkSchema({
  key: CUSTOM_NAME(500),
  iv: CUSTOM_NAME(500),
  text: CUSTOM_NAME(500),
});
