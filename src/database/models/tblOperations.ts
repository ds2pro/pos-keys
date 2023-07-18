import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tblPermissions, tblPermissionsId } from './tblPermissions';

export interface tblOperationsAttributes {
  id: number;
  guid?: string;
  name?: string;
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
  createdBy?: number;
  updatedBy?: number;
  deletdBy?: number;
}

export type tblOperationsPk = 'id';
export type tblOperationsId = tblOperations[tblOperationsPk];
export type tblOperationsOptionalAttributes =
  | 'id'
  | 'guid'
  | 'name'
  | 'createdDate'
  | 'updatedDate'
  | 'deletedDate'
  | 'createdBy'
  | 'updatedBy'
  | 'deletdBy';
export type tblOperationsCreationAttributes = Optional<tblOperationsAttributes, tblOperationsOptionalAttributes>;

export class tblOperations extends Model<tblOperationsAttributes, tblOperationsCreationAttributes> implements tblOperationsAttributes {
  id!: number;
  guid?: string;
  name?: string;
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
  createdBy?: number;
  updatedBy?: number;
  deletdBy?: number;

  // tblOperations hasMany tblPermissions via operationId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof tblOperations {
    return tblOperations.init(
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
        tableName: 'tblOperations',
        schema: 'dbo',
        timestamps: true,
        paranoid: true,
        deletedAt: 'deletedDate',
        createdAt: 'createdDate',
        updatedAt: 'updatedDate',
        indexes: [
          {
            name: 'PK_tblOperations',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
