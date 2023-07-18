import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tblPermissions, tblPermissionsId } from './tblPermissions';
import type { tblRoles, tblRolesId } from './tblRoles';

export interface tblRolesPermissionsAttributes {
  id: number;
  guid?: string;
  roleId?: number;
  permissionId?: number;
  isActive?: boolean;
  isDeleted?: boolean;
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;
}

export type tblRolesPermissionsPk = 'id';
export type tblRolesPermissionsId = tblRolesPermissions[tblRolesPermissionsPk];
export type tblRolesPermissionsOptionalAttributes =
  | 'id'
  | 'guid'
  | 'roleId'
  | 'permissionId'
  | 'isActive'
  | 'isDeleted'
  | 'createdDate'
  | 'updatedDate'
  | 'deletedDate'
  | 'createdBy'
  | 'updatedBy'
  | 'deletedBy';
export type tblRolesPermissionsCreationAttributes = Optional<tblRolesPermissionsAttributes, tblRolesPermissionsOptionalAttributes>;

export class tblRolesPermissions
  extends Model<tblRolesPermissionsAttributes, tblRolesPermissionsCreationAttributes>
  implements tblRolesPermissionsAttributes
{
  id!: number;
  guid?: string;
  roleId?: number;
  permissionId?: number;
  isActive?: boolean;
  isDeleted?: boolean;
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;

  // tblRolesPermissions belongsTo tblPermissions via permissionId
  permission!: tblPermissions;
  getPermission!: Sequelize.BelongsToGetAssociationMixin<tblPermissions>;
  setPermission!: Sequelize.BelongsToSetAssociationMixin<tblPermissions, tblPermissionsId>;
  createPermission!: Sequelize.BelongsToCreateAssociationMixin<tblPermissions>;
  // tblRolesPermissions belongsTo tblRoles via roleId
  role!: tblRoles;
  getRole!: Sequelize.BelongsToGetAssociationMixin<tblRoles>;
  setRole!: Sequelize.BelongsToSetAssociationMixin<tblRoles, tblRolesId>;
  createRole!: Sequelize.BelongsToCreateAssociationMixin<tblRoles>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tblRolesPermissions {
    return tblRolesPermissions.init(
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
        roleId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'tblRoles',
            key: 'id',
          },
        },
        permissionId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'tblPermissions',
            key: 'id',
          },
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
        tableName: 'tblRolesPermissions',
        schema: 'dbo',
        timestamps: true,
        paranoid: true,
        deletedAt: 'deletedDate',
        createdAt: 'createdDate',
        updatedAt: 'updatedDate',
        indexes: [
          {
            name: 'PK_tblRolesPermissions',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
