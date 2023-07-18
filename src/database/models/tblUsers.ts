import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tblRoles, tblRolesId } from './tblRoles';
import type { tblUsersLog, tblUsersLogId } from './tblUsersLog';

export interface tblUsersAttributes {
  id: number;
  roleId?: number;
  guid?: string;
  fullName?: string;
  userName?: string;
  password?: string;
  email?: string;
  image?: string;
  prefferedLanguage?: string;
  prefferedMode?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;
}

export type tblUsersPk = 'id';
export type tblUsersId = tblUsers[tblUsersPk];
export type tblUsersOptionalAttributes =
  | 'id'
  | 'roleId'
  | 'guid'
  | 'fullName'
  | 'userName'
  | 'password'
  | 'email'
  | 'image'
  | 'prefferedLanguage'
  | 'prefferedMode'
  | 'isActive'
  | 'isDeleted'
  | 'createdDate'
  | 'updatedDate'
  | 'deletedDate'
  | 'createdBy'
  | 'updatedBy'
  | 'deletedBy';
export type tblUsersCreationAttributes = Optional<tblUsersAttributes, tblUsersOptionalAttributes>;

export class tblUsers extends Model<tblUsersAttributes, tblUsersCreationAttributes> implements tblUsersAttributes {
  id!: number;
  roleId?: number;
  guid?: string;
  fullName?: string;
  userName?: string;
  password?: string;
  email?: string;
  image?: string;
  prefferedLanguage?: string;
  prefferedMode?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;

  // tblUsers belongsTo tblRoles via roleId
  role!: tblRoles;
  getRole!: Sequelize.BelongsToGetAssociationMixin<tblRoles>;
  setRole!: Sequelize.BelongsToSetAssociationMixin<tblRoles, tblRolesId>;
  createRole!: Sequelize.BelongsToCreateAssociationMixin<tblRoles>;
  // tblUsers hasMany tblUsersLog via userId
  tblUsersLogs!: tblUsersLog[];
  getTblUsersLogs!: Sequelize.HasManyGetAssociationsMixin<tblUsersLog>;
  setTblUsersLogs!: Sequelize.HasManySetAssociationsMixin<tblUsersLog, tblUsersLogId>;
  addTblUsersLog!: Sequelize.HasManyAddAssociationMixin<tblUsersLog, tblUsersLogId>;
  addTblUsersLogs!: Sequelize.HasManyAddAssociationsMixin<tblUsersLog, tblUsersLogId>;
  createTblUsersLog!: Sequelize.HasManyCreateAssociationMixin<tblUsersLog>;
  removeTblUsersLog!: Sequelize.HasManyRemoveAssociationMixin<tblUsersLog, tblUsersLogId>;
  removeTblUsersLogs!: Sequelize.HasManyRemoveAssociationsMixin<tblUsersLog, tblUsersLogId>;
  hasTblUsersLog!: Sequelize.HasManyHasAssociationMixin<tblUsersLog, tblUsersLogId>;
  hasTblUsersLogs!: Sequelize.HasManyHasAssociationsMixin<tblUsersLog, tblUsersLogId>;
  countTblUsersLogs!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof tblUsers {
    return tblUsers.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        roleId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'tblRoles',
            key: 'id',
          },
        },
        guid: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        fullName: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        userName: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        image: {
          type: DataTypes.STRING(250),
          allowNull: true,
        },
        prefferedLanguage: {
          type: DataTypes.STRING(20),
          allowNull: true,
          defaultValue: '(NEnglish',
        },
        prefferedMode: {
          type: DataTypes.STRING(7),
          allowNull: true,
          defaultValue: '(NLight',
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
        tableName: 'tblUsers',
        schema: 'dbo',
        hasTrigger: true,
        timestamps: true,
        paranoid: true,
        deletedAt: 'deletedDate',
        createdAt: 'createdDate',
        updatedAt: 'updatedDate',
        indexes: [
          {
            name: 'PK_tblUsers',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
