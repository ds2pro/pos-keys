import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { customers, customersId } from './customers';

export interface tblKeysAttributes {
  id: number;
  guid?: string;
  customerId?: number;
  key?: string;
  period?: number;
  generatedDate?: Date;
  activatedDate?: Date;
  expiryDate?: Date;
  isActive?: boolean;
  isDeleted?: boolean;
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;
}

export type tblKeysPk = 'id';
export type tblKeysId = tblKeys[tblKeysPk];
export type tblKeysOptionalAttributes =
  | 'id'
  | 'guid'
  | 'customerId'
  | 'key'
  | 'period'
  | 'generatedDate'
  | 'activatedDate'
  | 'expiryDate'
  | 'isActive'
  | 'isDeleted'
  | 'createdDate'
  | 'updatedDate'
  | 'deletedDate'
  | 'createdBy'
  | 'updatedBy'
  | 'deletedBy';
export type tblKeysCreationAttributes = Optional<tblKeysAttributes, tblKeysOptionalAttributes>;

export class tblKeys extends Model<tblKeysAttributes, tblKeysCreationAttributes> implements tblKeysAttributes {
  id!: number;
  guid?: string;
  customerId?: number;
  key?: string;
  period?: number;
  generatedDate?: Date;
  activatedDate?: Date;
  expiryDate?: Date;
  isActive?: boolean;
  isDeleted?: boolean;
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;

  // tblKeys belongsTo customers via customerId
  customer!: customers;
  getCustomer!: Sequelize.BelongsToGetAssociationMixin<customers>;
  setCustomer!: Sequelize.BelongsToSetAssociationMixin<customers, customersId>;
  createCustomer!: Sequelize.BelongsToCreateAssociationMixin<customers>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tblKeys {
    return tblKeys.init(
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
        customerId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'customers',
            key: 'id',
          },
        },
        key: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        period: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        generatedDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        activatedDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        expiryDate: {
          type: DataTypes.DATE,
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
        tableName: 'tblKeys',
        schema: 'dbo',
        timestamps: true,
        paranoid: true,
        deletedAt: 'deletedDate',
        createdAt: 'createdDate',
        updatedAt: 'updatedDate',
        indexes: [
          {
            name: 'PK_tblKeys',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
