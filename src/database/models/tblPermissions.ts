import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tblOperations, tblOperationsId } from './tblOperations';
import type { tblResources, tblResourcesId } from './tblResources';
import type { tblRolesPermissions, tblRolesPermissionsId } from './tblRolesPermissions';

export interface tblPermissionsAttributes {
  id: number;
  guid?: string;
  resourceId?: number;
  operationId?: number;
  value?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;
}

export type tblPermissionsPk = 'id';
export type tblPermissionsId = tblPermissions[tblPermissionsPk];
export type tblPermissionsOptionalAttributes =
  | 'id'
  | 'guid'
  | 'resourceId'
  | 'operationId'
  | 'value'
  | 'isActive'
  | 'isDeleted'
  | 'createdDate'
  | 'updatedDate'
  | 'deletedDate'
  | 'createdBy'
  | 'updatedBy'
  | 'deletedBy';
export type tblPermissionsCreationAttributes = Optional<tblPermissionsAttributes, tblPermissionsOptionalAttributes>;

export class tblPermissions extends Model<tblPermissionsAttributes, tblPermissionsCreationAttributes> implements tblPermissionsAttributes {
  id!: number;
  guid?: string;
  resourceId?: number;
  operationId?: number;
  value?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;

  // tblPermissions belongsTo tblOperations via operationId
  operation!: tblOperations;
  getOperation!: Sequelize.BelongsToGetAssociationMixin<tblOperations>;
  setOperation!: Sequelize.BelongsToSetAssociationMixin<tblOperations, tblOperationsId>;
  createOperation!: Sequelize.BelongsToCreateAssociationMixin<tblOperations>;
  // tblPermissions hasMany tblRolesPermissions via permissionId
  tblRolesPermissions!: tblRolesPermissions[];
  getTblRolesPermissions!: Sequelize.HasManyGetAssociationsMixin<tblRolesPermissions>;
  setTblRolesPermissions!: Sequelize.HasManySetAssociationsMixin<tblRolesPermissions, tblRolesPermissionsId>;
  addTblRolesPermission!: Sequelize.HasManyAddAssociationMixin<tblRolesPermissions, tblRolesPermissionsId>;
  addTblRolesPermissions!: Sequelize.HasManyAddAssociationsMixin<tblRolesPermissions, tblRolesPermissionsId>;
  createTblRolesPermission!: Sequelize.HasManyCreateAssociationMixin<tblRolesPermissions>;
  removeTblRolesPermission!: Sequelize.HasManyRemoveAssociationMixin<tblRolesPermissions, tblRolesPermissionsId>;
  removeTblRolesPermissions!: Sequelize.HasManyRemoveAssociationsMixin<tblRolesPermissions, tblRolesPermissionsId>;
  hasTblRolesPermission!: Sequelize.HasManyHasAssociationMixin<tblRolesPermissions, tblRolesPermissionsId>;
  hasTblRolesPermissions!: Sequelize.HasManyHasAssociationsMixin<tblRolesPermissions, tblRolesPermissionsId>;
  countTblRolesPermissions!: Sequelize.HasManyCountAssociationsMixin;
  // tblPermissions belongsTo tblResources via resourceId
  resource!: tblResources;
  getResource!: Sequelize.BelongsToGetAssociationMixin<tblResources>;
  setResource!: Sequelize.BelongsToSetAssociationMixin<tblResources, tblResourcesId>;
  createResource!: Sequelize.BelongsToCreateAssociationMixin<tblResources>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tblPermissions {
    return tblPermissions.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        guid: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        resourceId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'tblResources',
            key: 'id',
          },
        },
        operationId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'tblOperations',
            key: 'id',
          },
        },
        value: {
          type: DataTypes.STRING(500),
          allowNull: true,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        isDeleted: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        createdBy: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        updatedBy: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        deletedBy: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'tblPermissions',
        schema: 'dbo',
        timestamps: true,
        paranoid: true,
        deletedAt: 'deletedDate',
        createdAt: 'createdDate',
        updatedAt: 'updatedDate',
        indexes: [
          {
            name: 'PK_tblPermissions',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
