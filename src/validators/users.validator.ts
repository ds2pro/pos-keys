import { checkSchema } from 'express-validator';
import { EMAIL, FULL_NAME, ID, IMAGE, IS_ACTIVE, PASSWORD, POSITIVE_NUMBER, PREFERRED_LANGUAGE, PREFERRED_MODE, USERNAME } from './common.validator';

const commonCreatEditFields = {
  roleId: POSITIVE_NUMBER,
  fullName: FULL_NAME,
  userName: USERNAME,
  email: EMAIL,
  image: IMAGE,
  prefferedLanguage: PREFERRED_LANGUAGE,
  prefferedMode: PREFERRED_MODE,
  isActive: IS_ACTIVE,
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
