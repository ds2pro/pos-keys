import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface tblSettingsAttributes {
  id: number;
  guid?: string;
  key?: string;
  value?: string;
  isDeleted?: boolean;
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;
}

export type tblSettingsPk = 'id';
export type tblSettingsId = tblSettings[tblSettingsPk];
export type tblSettingsOptionalAttributes =
  | 'id'
  | 'guid'
  | 'key'
  | 'value'
  | 'isDeleted'
  | 'createdDate'
  | 'updatedDate'
  | 'deletedDate'
  | 'createdBy'
  | 'updatedBy'
  | 'deletedBy';
export type tblSettingsCreationAttributes = Optional<tblSettingsAttributes, tblSettingsOptionalAttributes>;

export class tblSettings extends Model<tblSettingsAttributes, tblSettingsCreationAttributes> implements tblSettingsAttributes {
  id!: number;
  guid?: string;
  key?: string;
  value?: string;
  isDeleted?: boolean;
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof tblSettings {
    return tblSettings.init(
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
        key: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        value: {
          type: DataTypes.STRING(500),
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
        tableName: 'tblSettings',
        schema: 'dbo',
        timestamps: true,
        paranoid: true,
        deletedAt: 'deletedDate',
        createdAt: 'createdDate',
        updatedAt: 'updatedDate',
        indexes: [
          {
            name: 'PK_tblSettings',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
