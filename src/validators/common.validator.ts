import { CustomValidator, ParamSchema } from 'express-validator';

import { HttpException } from '@exceptions/HttpException';
import moment from 'moment';
import {
  ADDRESS_MAX_LENGTH,
  ADDRESS_MIN_LENGTH,
  FULL_NAME_MAX_LENGTH,
  FULL_NAME_MIN_LENGTH,
  generateLengthErrorMessage,
  LONG_NAME_MAX_LENGTH,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  SHORT_NAME_MAX_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from './constants.validator';
import { isIn } from 'class-validator';

const usernameRegex = new RegExp(`^(?=.{${USERNAME_MIN_LENGTH},${USERNAME_MAX_LENGTH}}$)(?![_.0-9])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])$`);

export const BOOLEAN: ParamSchema = {
  in: 'body',
  isBoolean: {
    errorMessage: 'is not a boolean',
  },
  toBoolean: true,
};

const isString: CustomValidator = value => {
  if (value === undefined) {
    throw new HttpException(400, ' is missing');
  }
  if (!value || (value && typeof value !== 'string')) {
    throw new HttpException(400, 'should be a string');
  }
  return true;
};

const isValidDOB: CustomValidator = value => {
  const current = moment(new Date());
  const date = moment(new Date(value));
  if (current >= date) {
    return true;
  }
};

export const DATE: ParamSchema = {
  in: 'body',
  isDate: {
    options: {
      format: 'MM/DD/YYYY',
      delimiters: ['/'],
    },
    errorMessage: 'format should be MM/DD/YYYY',
  },
};

export const DOB: ParamSchema = {
  in: 'body',
  isDate: {
    options: {
      format: 'MM/DD/YYYY',
      delimiters: ['/'],
    },
    errorMessage: 'format should be MM/DD/YYYY',
  },
  custom: {
    options: isValidDOB,
    errorMessage: 'cannot be a future date',
  },
};

export const validationDate: ParamSchema = {
  in: 'body',
  isDate: {
    options: {
      format: 'MM/DD/YYYY',
      delimiters: ['/'],
    },
    errorMessage: 'format should be MM/DD/YYYY',
  },
};

const dateTimeRegex = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/;
export const DateTime: ParamSchema = {
  in: 'body',
  matches: {
    options: dateTimeRegex,
    errorMessage: 'invalid date',
  },
};

export const IS_PAUSED: ParamSchema = BOOLEAN;
export const IS_ACTIVE: ParamSchema = BOOLEAN;
export const IS_POSTED: ParamSchema = BOOLEAN;

export const PASSWORD: ParamSchema = {
  in: 'body',
  isStrongPassword: {
    options: {
      minLength: 6,
      minLowercase: 0,
      minNumbers: 0,
      minSymbols: 0,
      minUppercase: 0,
    },
    errorMessage: 'should be at least 6 chars',
  },
};
export const EMAIL: ParamSchema = {
  in: 'body',
  isEmail: {
    errorMessage: 'entered is invalid',
  },
};

export const IMAGE: ParamSchema = {
  optional: {
    options: {
      nullable: true,
    },
  },
  in: 'body',
  isString: {
    errorMessage: 'should be a string',
  },
  trim: {
    options: [' '],
  },
};

export const USERNAME: ParamSchema = {
  in: 'body',
  isString: {
    errorMessage: 'should be a string',
    bail: true,
  },
  trim: true,
  escape: true,
  matches: {
    options: usernameRegex,
    errorMessage: 'invalid username',
  },
};

export const FULL_NAME: ParamSchema = {
  in: 'body',
  isString: {
    errorMessage: 'should be a string',
    bail: true,
  },
  isLength: {
    errorMessage: generateLengthErrorMessage(FULL_NAME_MIN_LENGTH, FULL_NAME_MAX_LENGTH),
    options: { min: FULL_NAME_MIN_LENGTH, max: FULL_NAME_MAX_LENGTH },
  },
};

export const PREFERRED_LANGUAGE: ParamSchema = {
  in: 'body',
  isString: {
    errorMessage: 'should be a string',
    bail: true,
  },
  custom: {
    options: value => {
      if (!isIn(value, ['English', 'Arabic'])) {
        throw new HttpException(400, 'Preferred language should be either English or Arabic');
      }
      return true;
    },
  },
};
export const PREFERRED_MODE: ParamSchema = {
  in: 'body',
  isString: {
    errorMessage: 'should be a string',
    bail: true,
  },
  custom: {
    options: value => {
      if (!isIn(value, ['Light', 'Dark'])) {
        throw new HttpException(400, 'Preferred mode should be either Light or Dark');
      }
      return true;
    },
  },
};
enum NameLength {
  SHORT = SHORT_NAME_MAX_LENGTH,
  NORMAL = NAME_MAX_LENGTH,
  LONG = LONG_NAME_MAX_LENGTH,
}

const getNameSchema = (type: NameLength = NameLength.NORMAL): any => {
  return {
    in: 'body',
    custom: {
      options: isString,
      bail: true,
    },
    trim: {
      options: [' '],
    },
    isLength: {
      errorMessage: generateLengthErrorMessage(NAME_MIN_LENGTH, type),
      options: { min: NAME_MIN_LENGTH, max: type },
    },
  };
};
const getPositiveNumberSchema = (strict?: boolean): any => {
  return {
    in: 'body',
    isInt: {
      options: {
        gt: strict ? 0 : -1,
      },
      errorMessage: `should be a ${strict ? 'strictly ' : ''}positive number`,
    },
    toInt: true,
  };
};

const getPeriodNumberSchema = (): any => {
  return {
    in: 'body',
    isInt: {
      options: {
        custom: {
          options: (value: number) => value === -1 || value > 0,
        },
      },
      errorMessage: `should be either -1 or a positive number greater than 0`,
    },
    toInt: true,
  };
};

const getPositiveFloatNumberSchema = (strict?: boolean): ParamSchema => {
  const conditionalGt: any = {};
  if (strict) {
    conditionalGt.gt = 0;
  }
  return {
    in: 'body',
    isFloat: {
      options: {
        min: 0,
        ...conditionalGt,
      },
      errorMessage: `should be a ${strict ? 'strictly ' : ''}positive decimal number`,
    },
    toFloat: true,
  };
};

export const ARRAY: ParamSchema = {
  in: 'body',
  isArray: {
    errorMessage: 'should be an array',
  },
};
export const NOT_EMPTY_ARRAY: ParamSchema = {
  in: 'body',
  isArray: {
    errorMessage: 'should be an array',
  },
  custom: {
    options: (value: any) => value.length > 0,
    errorMessage: 'array cannot be empty',
  },
};

export const DefaultViewValidator: ParamSchema = {
  in: 'body',
  custom: {
    options: (value: string) => value === 'color' || value === 'image',
    errorMessage: 'The defaultView must be either "color" or "image".',
  },
};

export const NUMBER_ARRAY: ParamSchema = {
  custom: {
    options: value => {
      return validateArrayOfIntegers(value);
    },
  },
};
export const validateArrayOfIntegers = (arr: unknown) => {
  const isArray = Array.isArray(arr);
  if (!isArray) {
    throw new Error('should be an array');
  }
  const returned = arr.filter(item => typeof item === 'number');
  if (returned.length !== arr.length) {
    throw new Error('array should contain only numbers');
  }
  return true;
};

export const validateArrayOfUniqueStrings = (arr: unknown) => {
  const isArray = Array.isArray(arr);
  if (!isArray) {
    throw new Error('should be an array');
  }
  if (new Set(arr).size !== arr.length) {
    throw new Error('array contains duplicates');
  }
  return true;
};

export const ID: ParamSchema = {
  in: 'params',
  isInt: {
    errorMessage: 'should be a number',
  },
  trim: {
    options: [' '],
  },
};

export const ADDRESS_LENGTH: ParamSchema = {
  in: 'body',
  isString: {
    errorMessage: 'should be a string',
    bail: true,
  },
  isLength: {
    errorMessage: generateLengthErrorMessage(ADDRESS_MIN_LENGTH, ADDRESS_MAX_LENGTH),
    options: { min: ADDRESS_MIN_LENGTH, max: ADDRESS_MAX_LENGTH },
  },
};

export const TIME_PERIOD: ParamSchema = getPeriodNumberSchema();
export const STRICTLY_POSITIVE_NUMBER: ParamSchema = getPositiveNumberSchema(true);
export const POSITIVE_NUMBER: ParamSchema = getPositiveNumberSchema();
export const STRICTLY_POSITIVE_FLOAT: ParamSchema = getPositiveFloatNumberSchema(true);
export const POSITIVE_FLOAT: ParamSchema = getPositiveFloatNumberSchema();
export const SHORT_NAME: ParamSchema = getNameSchema(NameLength.SHORT);
export const LONG_NAME: ParamSchema = getNameSchema(NameLength.LONG);
export const NAME: ParamSchema = getNameSchema();
export const CUSTOM_NAME = (length: number): ParamSchema => getNameSchema(length);

function isFloat(conditionalGt: { gt: number } | { gt?: undefined }) {
  throw new Error('Function not implemented.');
}
