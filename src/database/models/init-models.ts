import type { Sequelize } from 'sequelize';
import { customers as _customers } from './customers';
import type { customersAttributes, customersCreationAttributes } from './customers';
import { tblKeys as _tblKeys } from './tblKeys';
import type { tblKeysAttributes, tblKeysCreationAttributes } from './tblKeys';
import { tblOperations as _tblOperations } from './tblOperations';
import type { tblOperationsAttributes, tblOperationsCreationAttributes } from './tblOperations';
import { tblPermissions as _tblPermissions } from './tblPermissions';
import type { tblPermissionsAttributes, tblPermissionsCreationAttributes } from './tblPermissions';
import { tblResources as _tblResources } from './tblResources';
import type { tblResourcesAttributes, tblResourcesCreationAttributes } from './tblResources';
import { tblRoles as _tblRoles } from './tblRoles';
import type { tblRolesAttributes, tblRolesCreationAttributes } from './tblRoles';
import { tblRolesPermissions as _tblRolesPermissions } from './tblRolesPermissions';
import type { tblRolesPermissionsAttributes, tblRolesPermissionsCreationAttributes } from './tblRolesPermissions';
import { tblSettings as _tblSettings } from './tblSettings';
import type { tblSettingsAttributes, tblSettingsCreationAttributes } from './tblSettings';
import { tblUsers as _tblUsers } from './tblUsers';
import type { tblUsersAttributes, tblUsersCreationAttributes } from './tblUsers';
import { tblUsersLog as _tblUsersLog } from './tblUsersLog';
import type { tblUsersLogAttributes, tblUsersLogCreationAttributes } from './tblUsersLog';

export {
  _customers as customers,
  _tblKeys as tblKeys,
  _tblOperations as tblOperations,
  _tblPermissions as tblPermissions,
  _tblResources as tblResources,
  _tblRoles as tblRoles,
  _tblRolesPermissions as tblRolesPermissions,
  _tblSettings as tblSettings,
  _tblUsers as tblUsers,
  _tblUsersLog as tblUsersLog,
};

export type {
  customersAttributes,
  customersCreationAttributes,
  tblKeysAttributes,
  tblKeysCreationAttributes,
  tblOperationsAttributes,
  tblOperationsCreationAttributes,
  tblPermissionsAttributes,
  tblPermissionsCreationAttributes,
  tblResourcesAttributes,
  tblResourcesCreationAttributes,
  tblRolesAttributes,
  tblRolesCreationAttributes,
  tblRolesPermissionsAttributes,
  tblRolesPermissionsCreationAttributes,
  tblSettingsAttributes,
  tblSettingsCreationAttributes,
  tblUsersAttributes,
  tblUsersCreationAttributes,
  tblUsersLogAttributes,
  tblUsersLogCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const customers = _customers.initModel(sequelize);
  const tblKeys = _tblKeys.initModel(sequelize);
  const tblOperations = _tblOperations.initModel(sequelize);
  const tblPermissions = _tblPermissions.initModel(sequelize);
  const tblResources = _tblResources.initModel(sequelize);
  const tblRoles = _tblRoles.initModel(sequelize);
  const tblRolesPermissions = _tblRolesPermissions.initModel(sequelize);
  const tblSettings = _tblSettings.initModel(sequelize);
  const tblUsers = _tblUsers.initModel(sequelize);
  const tblUsersLog = _tblUsersLog.initModel(sequelize);

  tblKeys.belongsTo(customers, { as: 'customer', foreignKey: 'customerId' });
  customers.hasMany(tblKeys, { as: 'tblKeys', foreignKey: 'customerId' });
  tblPermissions.belongsTo(tblOperations, { as: 'operation', foreignKey: 'operationId' });
  tblOperations.hasMany(tblPermissions, { as: 'tblPermissions', foreignKey: 'operationId' });
  tblRolesPermissions.belongsTo(tblPermissions, { as: 'permission', foreignKey: 'permissionId' });
  tblPermissions.hasMany(tblRolesPermissions, { as: 'tblRolesPermissions', foreignKey: 'permissionId' });
  tblPermissions.belongsTo(tblResources, { as: 'resource', foreignKey: 'resourceId' });
  tblResources.hasMany(tblPermissions, { as: 'tblPermissions', foreignKey: 'resourceId' });
  tblRolesPermissions.belongsTo(tblRoles, { as: 'role', foreignKey: 'roleId' });
  tblRoles.hasMany(tblRolesPermissions, { as: 'tblRolesPermissions', foreignKey: 'roleId' });
  tblUsers.belongsTo(tblRoles, { as: 'role', foreignKey: 'roleId' });
  tblRoles.hasMany(tblUsers, { as: 'tblUsers', foreignKey: 'roleId' });
  tblUsersLog.belongsTo(tblUsers, { as: 'user', foreignKey: 'userId' });
  tblUsers.hasMany(tblUsersLog, { as: 'tblUsersLogs', foreignKey: 'userId' });

  return {
    customers: customers,
    tblKeys: tblKeys,
    tblOperations: tblOperations,
    tblPermissions: tblPermissions,
    tblResources: tblResources,
    tblRoles: tblRoles,
    tblRolesPermissions: tblRolesPermissions,
    tblSettings: tblSettings,
    tblUsers: tblUsers,
    tblUsersLog: tblUsersLog,
  };
}
