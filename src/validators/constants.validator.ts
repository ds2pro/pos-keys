export const NAME_MIN_LENGTH = 1;
export const SHORT_NAME_MAX_LENGTH = 20;
export const NAME_MAX_LENGTH = 45;
export const LONG_NAME_MAX_LENGTH = 100;
export const ADDRESS_MIN_LENGTH = 5;
export const ADDRESS_MAX_LENGTH = 200;
export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 20;
export const FULL_NAME_MIN_LENGTH = 1;
export const FULL_NAME_MAX_LENGTH = 50;

export const generateLengthErrorMessage = (min: number, max: number) => {
  return `length should be at least ${min} and at most ${max}`;
};
