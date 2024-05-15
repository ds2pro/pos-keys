import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tblRolesPermissions, tblRolesPermissionsId } from './tblRolesPermissions';
import type { tblUsers, tblUsersId } from './tblUsers';

export interface tblRolesAttributes {
  id: number;
  guid?: string;
  keyName?: string;
  name?: string;
  description?: string;
  isSystem?: boolean;
  isAdmin?: boolean;
  isActive?: boolean;
  isDeleted?: boolean;
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;
}

export type tblRolesPk = 'id';
export type tblRolesId = tblRoles[tblRolesPk];
export type tblRolesOptionalAttributes =
  | 'id'
  | 'guid'
  | 'keyName'
  | 'name'
  | 'description'
  | 'isSystem'
  | 'isAdmin'
  | 'isActive'
  | 'isDeleted'
  | 'createdDate'
  | 'updatedDate'
  | 'deletedDate'
  | 'createdBy'
  | 'updatedBy'
  | 'deletedBy';
export type tblRolesCreationAttributes = Optional<tblRolesAttributes, tblRolesOptionalAttributes>;

export class tblRoles extends Model<tblRolesAttributes, tblRolesCreationAttributes> implements tblRolesAttributes {
  id!: number;
  guid?: string;
  keyName?: string;
  name?: string;
  description?: string;
  isSystem?: boolean;
  isAdmin?: boolean;
  isActive?: boolean;
  isDeleted?: boolean;
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;

  // tblRoles hasMany tblRolesPermissions via roleId
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
  // tblRoles hasMany tblUsers via roleId
  tblUsers!: tblUsers[];
  getTblUsers!: Sequelize.HasManyGetAssociationsMixin<tblUsers>;
  setTblUsers!: Sequelize.HasManySetAssociationsMixin<tblUsers, tblUsersId>;
  addTblUser!: Sequelize.HasManyAddAssociationMixin<tblUsers, tblUsersId>;
  addTblUsers!: Sequelize.HasManyAddAssociationsMixin<tblUsers, tblUsersId>;
  createTblUser!: Sequelize.HasManyCreateAssociationMixin<tblUsers>;
  removeTblUser!: Sequelize.HasManyRemoveAssociationMixin<tblUsers, tblUsersId>;
  removeTblUsers!: Sequelize.HasManyRemoveAssociationsMixin<tblUsers, tblUsersId>;
  hasTblUser!: Sequelize.HasManyHasAssociationMixin<tblUsers, tblUsersId>;
  hasTblUsers!: Sequelize.HasManyHasAssociationsMixin<tblUsers, tblUsersId>;
  countTblUsers!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof tblRoles {
    return tblRoles.init(
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
        keyName: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        name: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        description: {
          type: DataTypes.STRING(500),
          allowNull: true,
        },
        isSystem: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        isAdmin: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false,
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
        tableName: 'tblRoles',
        schema: 'dbo',
        timestamps: true,
        paranoid: true,
        deletedAt: 'deletedDate',
        createdAt: 'createdDate',
        updatedAt: 'updatedDate',
        indexes: [
          {
            name: 'PK_tblRoles',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
