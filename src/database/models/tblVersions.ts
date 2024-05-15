import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface tblVersionsAttributes {
  id: number;
  guid?: string;
  version?: string;
  versionDate?: Date;
  script?: string;
}

export type tblVersionsPk = 'id';
export type tblVersionsId = tblVersions[tblVersionsPk];
export type tblVersionsOptionalAttributes = 'id' | 'guid' | 'version' | 'versionDate' | 'script';
export type tblVersionsCreationAttributes = Optional<tblVersionsAttributes, tblVersionsOptionalAttributes>;

export class tblVersions extends Model<tblVersionsAttributes, tblVersionsCreationAttributes> implements tblVersionsAttributes {
  id!: number;
  guid?: string;
  version?: string;
  versionDate?: Date;
  script?: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof tblVersions {
    return tblVersions.init(
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
        version: {
          type: DataTypes.STRING(10),
          allowNull: true,
        },
        versionDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        script: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'tblVersions',
        schema: 'dbo',
        timestamps: true,
        paranoid: true,
        deletedAt: 'deletedDate',
        createdAt: 'createdDate',
        updatedAt: 'updatedDate',
        indexes: [
          {
            name: 'PK_tblVersions',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
