import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tblKeys, tblKeysId } from './tblKeys';

export interface customersAttributes {
  id: number;
  guid?: string;
  name?: string;
  abbreviation?: string;
  phone?: string;
  mobile?: string;
  email?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
  createdById?: number;
  updatedById?: number;
  deletedById?: number;
}

export type customersPk = 'id';
export type customersId = customers[customersPk];
export type customersOptionalAttributes =
  | 'id'
  | 'guid'
  | 'name'
  | 'abbreviation'
  | 'phone'
  | 'mobile'
  | 'email'
  | 'isActive'
  | 'isDeleted'
  | 'createdDate'
  | 'updatedDate'
  | 'deletedDate'
  | 'createdById'
  | 'updatedById'
  | 'deletedById';
export type customersCreationAttributes = Optional<customersAttributes, customersOptionalAttributes>;

export class customers extends Model<customersAttributes, customersCreationAttributes> implements customersAttributes {
  id!: number;
  guid?: string;
  name?: string;
  abbreviation?: string;
  phone?: string;
  mobile?: string;
  email?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
  createdById?: number;
  updatedById?: number;
  deletedById?: number;

  // customers hasMany tblKeys via customerId
  tblKeys!: tblKeys[];
  getTblKeys!: Sequelize.HasManyGetAssociationsMixin<tblKeys>;
  setTblKeys!: Sequelize.HasManySetAssociationsMixin<tblKeys, tblKeysId>;
  addTblKey!: Sequelize.HasManyAddAssociationMixin<tblKeys, tblKeysId>;
  addTblKeys!: Sequelize.HasManyAddAssociationsMixin<tblKeys, tblKeysId>;
  createTblKey!: Sequelize.HasManyCreateAssociationMixin<tblKeys>;
  removeTblKey!: Sequelize.HasManyRemoveAssociationMixin<tblKeys, tblKeysId>;
  removeTblKeys!: Sequelize.HasManyRemoveAssociationsMixin<tblKeys, tblKeysId>;
  hasTblKey!: Sequelize.HasManyHasAssociationMixin<tblKeys, tblKeysId>;
  hasTblKeys!: Sequelize.HasManyHasAssociationsMixin<tblKeys, tblKeysId>;
  countTblKeys!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof customers {
    return customers.init(
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
        abbreviation: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        phone: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        mobile: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        email: {
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
        createdById: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        updatedById: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        deletedById: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'customers',
        schema: 'dbo',
        timestamps: true,
        paranoid: true,
        deletedAt: 'deletedDate',
        createdAt: 'createdDate',
        updatedAt: 'updatedDate',
        indexes: [
          {
            name: 'PK_customers',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
