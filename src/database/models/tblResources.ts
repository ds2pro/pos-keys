import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tblPermissions, tblPermissionsId } from './tblPermissions';

export interface tblResourcesAttributes {
  id: number;
  guid?: string;
  name?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
  createdBy?: number;
  updatedBy?: number;
  deletdBy?: number;
}

export type tblResourcesPk = 'id';
export type tblResourcesId = tblResources[tblResourcesPk];
export type tblResourcesOptionalAttributes =
  | 'id'
  | 'guid'
  | 'name'
  | 'isActive'
  | 'isDeleted'
  | 'createdDate'
  | 'updatedDate'
  | 'deletedDate'
  | 'createdBy'
  | 'updatedBy'
  | 'deletdBy';
export type tblResourcesCreationAttributes = Optional<tblResourcesAttributes, tblResourcesOptionalAttributes>;

export class tblResources extends Model<tblResourcesAttributes, tblResourcesCreationAttributes> implements tblResourcesAttributes {
  id!: number;
  guid?: string;
  name?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
  createdBy?: number;
  updatedBy?: number;
  deletdBy?: number;

  // tblResources hasMany tblPermissions via resourceId
  tblPermissions!: tblPermissions[];
  getTblPermissions!: Sequelize.HasManyGetAssociationsMixin<tblPermissions>;
  setTblPermissions!: Sequelize.HasManySetAssociationsMixin<tblPermissions, tblPermissionsId>;
  addTblPermission!: Sequelize.HasManyAddAssociationMixin<tblPermissions, tblPermissionsId>;
  addTblPermissions!: Sequelize.HasManyAddAssociationsMixin<tblPermissions, tblPermissionsId>;
  createTblPermission!: Sequelize.HasManyCreateAssociationMixin<tblPermissions>;
  removeTblPermission!: Sequelize.HasManyRemoveAssociationMixin<tblPermissions, tblPermissionsId>;
  removeTblPermissions!: Sequelize.HasManyRemoveAssociationsMixin<tblPermissions, tblPermissionsId>;
  hasTblPermission!: Sequelize.HasManyHasAssociationMixin<tblPermissions, tblPermissionsId>;
  hasTblPermissions!: Sequelize.HasManyHasAssociationsMixin<tblPermissions, tblPermissionsId>;
  countTblPermissions!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof tblResources {
    return tblResources.init(
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
        name: {
          type: DataTypes.STRING(50),
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
        deletdBy: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'tblResources',
        schema: 'dbo',
        timestamps: true,
        paranoid: true,
        deletedAt: 'deletedDate',
        createdAt: 'createdDate',
        updatedAt: 'updatedDate',
        indexes: [
          {
            name: 'PK_tblResources',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
