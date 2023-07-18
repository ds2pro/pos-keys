import { tblRoles } from '@/database/models/tblRoles';
import { tblUsers } from '@/database/models/tblUsers';
import { Identifiable } from '@/dtos/main.dto';
import {
  AdminResetPasswordDto,
  CreateUserDto,
  DeleteUserDto,
  EditUserDto,
  GetUserDto,
  GetUsersDropdownListDto,
  GetUsersDto,
  SetUserImageDto,
  SetUserLanguageDto,
  SetUserModeDto,
} from '@/dtos/users.dto';
import { HttpException } from '@/exceptions/HttpException';
import s from '@/init-sequelize';
import { EmptyResponse } from '@/response/main.response';
import {
  AdminResetPasswordResponse,
  CreateUserResponse,
  DeleteUserResponse,
  EditUserResponse,
  GetUserResponse,
  GetUsersDropdownListResponse,
  GetUsersResponse,
  GetUsersResponseListItem,
  SetUserImageResponse,
  SetUserLanguageResponse,
  SetUserModeResponse,
} from '@/response/users.response';
import { createUserLog, getUserBy } from '@/utils/user.util';
import { calculatePaginationFields, getSearchFieldsConds } from '@/utils/util';
import { hash } from 'bcrypt';
import moment from 'moment';
import { Op } from 'sequelize';

interface IUsersService {
  createUser(dto: CreateUserDto): Promise<CreateUserResponse>;
  editUser(dto: EditUserDto): Promise<EditUserResponse>;
  deleteUser(dto: DeleteUserDto): Promise<DeleteUserResponse>;
  getUsers(dto: GetUsersDto): Promise<GetUsersResponse>;
  getUser(dto: GetUserDto): Promise<GetUserResponse>;
  setUserImage(dto: SetUserImageDto): Promise<SetUserImageResponse>;
  setUserLanguage(dto: SetUserLanguageDto): Promise<SetUserLanguageResponse>;
  setUserMode(dto: SetUserModeDto): Promise<SetUserModeResponse>;
  adminResetPassword(dto: AdminResetPasswordDto): Promise<AdminResetPasswordResponse>;
  getUsersDropdownList(dto: GetUsersDropdownListDto): Promise<GetUsersDropdownListResponse>;
}

class UsersService implements IUsersService {
  async createUser(dto: CreateUserDto): Promise<CreateUserResponse> {
    const t = await s.transaction();
    try {
      const findUser = await getUserBy({ userName: dto.userName });
      if (findUser) {
        throw new HttpException(400, 'A user with the same username already exists');
      }
      const ownerRoleId = (await tblRoles.findOne({ where: { name: 'owner' } })).id;
      if (ownerRoleId == dto.roleId && !dto.isActive) {
        throw new HttpException(404, "Owner Role can't be Inactive");
      }
      const roleFound = await tblRoles.findByPk(dto.roleId);
      if (!roleFound) {
        throw new HttpException(404, 'Role not found');
      }
      const user = await tblUsers.create(
        {
          roleId: dto.roleId,
          fullName: dto.fullName,
          userName: dto.userName,
          password: await hash(dto.password, 10),
          email: dto.email,
          image: dto.image,
          prefferedLanguage: dto.prefferedLanguage || 'English',
          prefferedMode: dto.prefferedMode || 'Light',
          isActive: dto.isActive,
          createdBy: dto.__by.id,
        },
        {
          transaction: t,
        },
      );
      await createUserLog(dto.__by.id, 'Create User', `User created a user with id: ${user.id}`, t);
      await t.commit();
      const toReturn = await getUserBy({ id: user.id });
      delete toReturn.password;
      return toReturn;
    } catch (e) {
      await t.rollback();
      throw e;
    }
  }
  async editUser(dto: EditUserDto): Promise<EditUserResponse> {
    const t = await s.transaction();
    try {
      const ownerRoleId = (await tblRoles.findOne({ where: { name: 'owner' } })).id;
      if (ownerRoleId == dto.roleId && !dto.isActive) {
        throw new HttpException(404, "Owner Role can't be Inactive");
      }
      const roleFound = await tblRoles.findByPk(dto.roleId);
      if (!roleFound) {
        throw new HttpException(404, 'Role not found');
      }
      const exists = await tblUsers.findOne({
        where: {
          id: {
            [Op.not]: dto.id,
          },
          userName: dto.userName,
        },
      });
      if (exists) {
        throw new HttpException(400, 'A User with this username already exists');
      }
      await tblUsers.update(
        {
          roleId: dto.roleId,
          fullName: dto.fullName,
          userName: dto.userName,
          email: dto.email,
          image: dto.image,
          prefferedLanguage: dto.prefferedLanguage || 'English',
          prefferedMode: dto.prefferedMode || 'Light',
          isActive: dto.isActive,
          updatedBy: dto.__by.id,
        },
        {
          where: {
            id: dto.id,
          },
          transaction: t,
        },
      );
      await createUserLog(dto.__by.id, 'Edit User', `User edited user with id: ${dto.id}`, t);
      await t.commit();
      const toReturn = await getUserBy({ id: dto.id });
      delete toReturn.password;
      return toReturn;
    } catch (e) {
      await t.rollback();
      throw e;
    }
  }
  async deleteUser(dto: DeleteUserDto): Promise<DeleteUserResponse> {
    const t = await s.transaction();
    try {
      const user = await getUserBy({ id: dto.id });
      if (!user) {
        throw new HttpException(404, 'User not found');
      }
      if (user.userName === 'super' && user.role.keyName === 'owner') {
        throw new HttpException(400, 'You cannot delete this user');
      }
      await tblUsers.update(
        {
          deletedBy: dto.__by.id,
          isDeleted: true,
        },
        {
          where: {
            id: dto.id,
          },
          transaction: t,
        },
      );
      await tblUsers.destroy({
        where: {
          id: dto.id,
        },
        transaction: t,
      });
      await createUserLog(dto.__by.id, 'Delete User', `User deleted user with id: ${dto.id}`, t);
      await t.commit();
      return {};
    } catch (e) {
      await t.rollback();
      if (e.name === 'SequelizeForeignKeyConstraintError') {
        throw new HttpException(400, 'This user cannot be deleted due to a reference constraint.');
      }
      throw e;
    }
  }
  async getUsers(dto: GetUsersDto): Promise<GetUsersResponse> {
    const searchableFields = getSearchFieldsConds(dto.q, ['userName', 'fullName', 'email']);
    const cond = {
      ...searchableFields,
    };
    let adminCond;
    if (dto.__by.userName !== 'super') {
      adminCond = {
        userName: {
          [Op.ne]: 'super',
        },
      };
    }
    if (dto.isActive !== null) {
      cond.isActive = dto.isActive;
    }
    const users = await tblUsers.findAll({
      offset: Number(dto.offset),
      limit: Number(dto.limit),
      where: {
        ...cond,
        ...adminCond,
      },
      order: [['fullName', 'ASC']],
      include: [
        {
          model: tblRoles,
          as: 'role',
        },
      ],
    });
    const data: GetUsersResponseListItem[] = users.map(user => {
      return {
        id: user.id,
        guid: user.guid,
        email: user.email,
        image: user.image,
        userName: user.userName,
        fullName: user.fullName,
        isActive: user.isActive,
        prefferedLanguage: user.prefferedLanguage,
        prefferedMode: user.prefferedMode,
        role: {
          id: user.role.id,
          keyName: user.role.keyName,
          name: user.role.name,
          description: user.role.description,
          isActive: user.role.isActive,
          isSystem: user.role.isSystem,
        },
        createdDate: moment(user.createdDate).unix(),
        updatedDate: moment(user.updatedDate).unix(),
      };
    });
    const count = await tblUsers.count({
      where: {
        ...cond,
      },
    });
    const [hasMore] = calculatePaginationFields(count, data.length, Number(dto.offset), Number(dto.limit));
    return {
      total: count,
      hasMore: hasMore,
      size: data.length,
      data: data,
    };
  }
  async getUser(dto: Identifiable): Promise<GetUsersResponseListItem> {
    const user = await tblUsers.findByPk(dto.id, {
      include: [
        {
          model: tblRoles,
          as: 'role',
        },
      ],
    });
    if (!user) {
      throw new HttpException(404, 'User not found');
    }
    return {
      id: user.id,
      guid: user.guid,
      email: user.email,
      image: user.image,
      userName: user.userName,
      fullName: user.fullName,
      isActive: user.isActive,
      prefferedLanguage: user.prefferedLanguage,
      prefferedMode: user.prefferedMode,
      role: {
        id: user.role.id,
        keyName: user.role.keyName,
        name: user.role.name,
        description: user.role.description,
        isActive: user.role.isActive,
        isSystem: user.role.isSystem,
      },
      createdDate: moment(user.createdDate).unix(),
      updatedDate: moment(user.updatedDate).unix(),
    };
  }
  async setUserImage(dto: SetUserImageDto): Promise<EmptyResponse> {
    const t = await s.transaction();
    try {
      await tblUsers.update(
        {
          image: dto.image,
        },
        {
          where: {
            id: dto.__by.id,
          },
          transaction: t,
        },
      );
      await createUserLog(dto.__by.id, 'Set User Image', `User edited image with user id: ${dto.__by.id}`, t);
      await t.commit();
      return {};
    } catch (e) {
      await t.rollback();
      throw e;
    }
  }
  async setUserLanguage(dto: SetUserLanguageDto): Promise<EmptyResponse> {
    const t = await s.transaction();
    try {
      await tblUsers.update(
        {
          prefferedLanguage: dto.prefferedLanguage,
        },
        {
          where: {
            id: dto.__by.id,
          },
          transaction: t,
        },
      );
      await createUserLog(dto.__by.id, 'Set User Language', `User edited language with user id: ${dto.__by.id}`, t);
      await t.commit();
      return {};
    } catch (e) {
      await t.rollback();
      throw e;
    }
  }
  async setUserMode(dto: SetUserModeDto): Promise<EmptyResponse> {
    const t = await s.transaction();
    try {
      await tblUsers.update(
        {
          prefferedMode: dto.prefferedMode,
        },
        {
          where: {
            id: dto.__by.id,
          },
          transaction: t,
        },
      );
      await createUserLog(dto.__by.id, 'Set User Mode', `User edited mode with user id: ${dto.__by.id}`, t);
      await t.commit();
      return {};
    } catch (e) {
      await t.rollback();
      throw e;
    }
  }
  async adminResetPassword(dto: AdminResetPasswordDto): Promise<AdminResetPasswordResponse> {
    const t = await s.transaction();
    try {
      const user = await tblUsers.findByPk(dto.id);
      if (!user) {
        throw new HttpException(404, 'User does not exist');
      }
      await tblUsers.update(
        {
          password: await hash(dto.password, 10),
        },
        {
          where: {
            id: dto.id,
          },
          transaction: t,
        },
      );
      await createUserLog(dto.__by.id, 'Reset Password', `User reset password for user with id: ${dto.id}`, t);
      await t.commit();
      return {};
    } catch (e) {
      await t.rollback();
      throw e;
    }
  }
  async getUsersDropdownList(dto: GetUsersDropdownListDto): Promise<GetUsersDropdownListResponse> {
    const users = await tblUsers.findAll({
      where: {
        isActive: true,
      },
      order: [['fullName', 'ASC']],
    });
    return users.map(user => {
      return {
        id: user.id,
        name: user.fullName,
      };
    });
  }
}

export default UsersService;
