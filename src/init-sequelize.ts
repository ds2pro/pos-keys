import { Sequelize } from 'sequelize';
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from '@config';
import { initModels } from '@/database/models/init-models';
import * as DataTypes from 'sequelize/lib/data-types';

DataTypes.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options);
  return date.format('YYYY-MM-DD HH:mm:ss.SSS');
};
const s = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  dialect: 'mssql',
  port: Number(DB_PORT || 3306),
  host: DB_HOST,
  logging: false,
});
export const init = () => {
  initModels(s);
};
export default s;
