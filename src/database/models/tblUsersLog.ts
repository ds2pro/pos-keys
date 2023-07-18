import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tblUsers, tblUsersId } from './tblUsers';

export interface tblUsersLogAttributes {
  id: number;
  guid?: string;
  userId?: number;
  action?: string;
  description?: string;
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;
}

export type tblUsersLogPk = 'id';
export type tblUsersLogId = tblUsersLog[tblUsersLogPk];
export type tblUsersLogOptionalAttributes =
  | 'id'
  | 'guid'
  | 'userId'
  | 'action'
  | 'description'
  | 'createdDate'
  | 'updatedDate'
  | 'deletedDate'
  | 'createdBy'
  | 'updatedBy'
  | 'deletedBy';
export type tblUsersLogCreationAttributes = Optional<tblUsersLogAttributes, tblUsersLogOptionalAttributes>;

export class tblUsersLog extends Model<tblUsersLogAttributes, tblUsersLogCreationAttributes> implements tblUsersLogAttributes {
  id!: number;
  guid?: string;
  userId?: number;
  action?: string;
  description?: string;
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;

  // tblUsersLog belongsTo tblUsers via userId
  user!: tblUsers;
  getUser!: Sequelize.BelongsToGetAssociationMixin<tblUsers>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<tblUsers, tblUsersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<tblUsers>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tblUsersLog {
    return tblUsersLog.init(
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
        userId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'tblUsers',
            key: 'id',
          },
        },
        action: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        description: {
          type: DataTypes.STRING(500),
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
        tableName: 'tblUsersLog',
        schema: 'dbo',
        timestamps: true,
        paranoid: true,
        deletedAt: 'deletedDate',
        createdAt: 'createdDate',
        updatedAt: 'updatedDate',
        indexes: [
          {
            name: 'PK_tblUsersLog',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
