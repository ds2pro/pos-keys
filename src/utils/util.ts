import moment from 'moment';
import { Op } from 'sequelize';

export const isDevelopment = (): Boolean => {
  return process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging';
};

export const toTimestamp = (date: Date) => {
  return moment(date).unix();
};

export const convertNameToKey = (name: string) => {
  return name.toLowerCase().split(' ').join('_');
};

export const findIdsNotExistingIn = (inputIds: number[], ids: number[]) => {
  const arr = [];
  inputIds.forEach(id => {
    if (!ids.includes(id)) {
      arr.push(id);
    }
  });
  return arr;
};

export const removeUndefinedFromArray = (arr: any[]) => {
  return arr.filter(a => a !== undefined);
};

export const findNamesNotExistingIn = (inputNames: string[], names: string[]) => {
  const arr = [];
  inputNames.forEach(name => {
    if (!names.includes(name)) {
      arr.push(name);
    }
  });
  return arr;
};

export const toReadableNumber = (number: number): string => {
  return number.toLocaleString();
};

const makeConditionsFor = (arr: string[], comp: string): Record<string, Record<symbol, string>>[] => {
  const createItem = (fieldName: string, comp: string) => {
    return {
      [fieldName]: {
        [Op.like]: `%${comp}%`,
      },
    };
  };
  return arr.map(item => createItem(item, comp));
};

const makeForeignConditionsFor = (table: string, arr: string[], comp: string): Record<string, Record<symbol, string>>[] => {
  const createItem = (fieldName: string, comp: string) => {
    return {
      [`$${table}.${fieldName}$`]: {
        [Op.like]: `%${comp}%`,
      },
    };
  };
  return arr.map(item => createItem(item, comp));
};

export const getSearchFieldsConds = (q?: string, fields?: string[]): any => {
  const conditions = [];
  if (!q) {
    return {};
  }
  const fullStringCondition = {
    [Op.or]: makeConditionsFor(fields, q),
  };
  conditions.push(fullStringCondition);

  return {
    [Op.and]: conditions,
  };
};

export const getSearchFieldsCondsForeign = (table: string, q?: string, fields?: string[]): any => {
  const conditions = [];
  if (!q) {
    return {};
  }
  const fullStringCondition = {
    [Op.or]: makeForeignConditionsFor(table, fields, q),
  };
  conditions.push(fullStringCondition);

  return {
    [Op.and]: conditions,
  };
};

export const calculatePaginationFields = (count: number, dataLength: number, offset: number, limit: number) => {
  const currentPage = dataLength > 0 ? (offset + limit) / limit : -1;
  const totalPages = count / limit;
  const hasMore = currentPage < totalPages && dataLength > 0;
  return [hasMore];
};

export const getBooleanValue = (value: any): boolean | null => {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    const lowercaseValue = value.toLowerCase();
    if (lowercaseValue === 'true' || lowercaseValue === '1') {
      return true;
    }
    if (lowercaseValue === 'false' || lowercaseValue === '0') {
      return false;
    }
  }

  return null;
};

export const roundFloatNumber = (num: number | null): number | null => {
  if (num == null) {
    return null;
  }
  const limitedFloat = parseFloat(num.toFixed(2));
  return limitedFloat;
};

export const toDbDate = (date: any): Date | null => {
  if (date == null) {
    return null;
  }
  const d = moment.utc(date, 'MM/DD/YYYYZ');
  return d.toDate();
};

export const priceToReadable = (price: number, currencySymbol: string) => {
  const negative = price < 0;
  price = negative ? -price : price;
  return `${negative ? '-' : ''}${currencySymbol}${price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const DateTimeConversion = (dateString: string) => {
  const momentObj = moment(dateString, 'MM/DD/YYYY HH:mm:ss');
  const dateObj = momentObj.toDate();
  return dateObj;
};

export const toStringDateConversion = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
};

export const isDateFormate = (dateString: string) => {
  if (!dateString) {
    return null;
  }
  const pattern = /^\d{2}\/\d{2}\/\d{4}\s\d{2}:\d{2}:\d{2}$/;

  if (pattern.test(dateString)) {
    console.log('The variable is in the date format');
    return true;
  } else {
    console.log('The variable is not in the date format');
    return false;
  }
};

export const dateConditions = (from?: string, to?: string): object => {
  const cond: object = {};

  if (from && to) {
    cond['date'] = {
      [Op.between]: [toDbDate(from), toDbDate(to)],
    };
  } else if (from) {
    cond['date'] = {
      [Op.gte]: toDbDate(from),
    };
  } else if (to) {
    cond['date'] = {
      [Op.lte]: toDbDate(to),
    };
  }

  return cond;
};

export const calculateDateAfterDays = (days: number): Date => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + days);
  return currentDate;
};

export const calculateExpiryDate = (days: number): Date => {
  const currentDate = new Date();
  //currentDate.setDate(currentDate.getDate() + days);
  currentDate.setMinutes(currentDate.getMinutes() + 1);
  //currentDate.setHours(currentDate.getHours() + 3);
  return currentDate;
};

export const separateKeyEveryNChars = (key: string, n = 5): string => {
  let separatedKey = '';
  for (let i = 0; i < key.length; i += n) {
    separatedKey += key.slice(i, i + n) + (i + n < key.length ? '-' : '');
  }
  return separatedKey;
};

export const removeHyphens = (key: string | null): string => {
  if (key == null) {
    return key;
  }

  return key.replace(/-/g, '');
};
