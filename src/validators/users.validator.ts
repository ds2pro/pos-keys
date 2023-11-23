import { checkSchema } from 'express-validator';
import { EMAIL, FULL_NAME, ID, IMAGE, IS_ACTIVE, PASSWORD, POSITIVE_NUMBER, PREFERRED_LANGUAGE, PREFERRED_MODE, USERNAME } from './common.validator';
import { FULL_NAME_MAX_LENGTH, FULL_NAME_MIN_LENGTH } from './constants.validator';

const commonCreatEditFields = {
  roleId: POSITIVE_NUMBER,

  fullName: {
    in: 'body',
    isString: {
      errorMessage: 'fullName should be a string',
    },
    isLength: {
      errorMessage: `fullName should not be empty and must contain between ${FULL_NAME_MIN_LENGTH} and ${FULL_NAME_MAX_LENGTH}`,
      options: { min: FULL_NAME_MIN_LENGTH, max: FULL_NAME_MAX_LENGTH },
    },
  },
  userName: USERNAME,
  email: EMAIL,
  image: IMAGE,
  prefferedLanguage: PREFERRED_LANGUAGE,
  prefferedMode: PREFERRED_MODE,
  isActive: {
    in: 'body',
    isBoolean: {
      errorMessage: 'isActive should be boolean',
    },
    toBoolean: true,
  },
};
const createUserFields: any = {
  ...commonCreatEditFields,
  password: PASSWORD,
};
const editUserFields: any = {
  id: ID,
  ...commonCreatEditFields,
};
const setUserImageField: any = {
  image: IMAGE,
};
const setUserLanguageField: any = {
  prefferedLanguage: PREFERRED_LANGUAGE,
};
const setUserModeField: any = {
  prefferedMode: PREFERRED_MODE,
};
export const createUserValidator = checkSchema(createUserFields);
export const editUserValidator = checkSchema(editUserFields);
export const resetPasswordValidator = checkSchema({
  password: PASSWORD,
});
export const setUserImageValidator = checkSchema(setUserImageField);
export const setUserLanguageValidator = checkSchema(setUserLanguageField);
export const setUserModeValidator = checkSchema(setUserModeField);
