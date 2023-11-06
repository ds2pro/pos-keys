import { tblOperations } from '@/database/models/tblOperations';
import { tblPermissions } from '@/database/models/tblPermissions';
import { tblResources } from '@/database/models/tblResources';
import { tblRoles } from '@/database/models/tblRoles';
import { tblRolesPermissions } from '@/database/models/tblRolesPermissions';
import { tblUsers } from '@/database/models/tblUsers';
import { Identifiable } from '@/dtos/main.dto';
import {
  AddUsersToRoleDto,
  CreateRoleDto,
  DeleteRoleDto,
  EditRoleDto,
  GetInitialRolePermissionsDto,
  GetRoleDto,
  GetRolesDropdownListDto,
  GetRolesDto,
  GetUsersForRoleDto,
} from '@/dtos/roles.dto';
import { HttpException } from '@/exceptions/HttpException';
import s from '@/init-sequelize';
import { OPERATION_TYPES } from '@/models/base.model';
import { PermissionNameBuilder } from '@/permissions';
import { EmptyResponse } from '@/response/main.response';
import {
  AddUsersToRoleResponse,
  CreateRoleResponse,
  DeleteRoleResponse,
  EditRoleResponse,
  GetInitialRolePermissionsResponse,
  GetRoleResponse,
  GetRolesDropdownListResponse,
  GetRolesResponse,
  GetUsersForRoleResponse,
  PermissionItem,
  RolesPermissionsItem,
} from '@/response/roles.response';
import { createUserLog } from '@/utils/user.util';
import { convertNameToKey, findIdsNotExistingIn, getSearchFieldsConds, toReadableNumber } from '@/utils/util';
import { Op, QueryTypes } from 'sequelize';

interface IRolesService {
  createRole(dto: CreateRoleDto): Promise<CreateRoleResponse>;
  editRole(dto: EditRoleDto): Promise<EditRoleResponse>;
  deleteRole(dto: DeleteRoleDto): Promise<DeleteRoleResponse>;
  getRoles(dto: GetRolesDto): Promise<GetRolesResponse>;
  getRole(dto: GetRoleDto): Promise<GetRoleResponse>;
  getInitialRolePermissions(dto: GetInitialRolePermissionsDto): Promise<GetInitialRolePermissionsResponse>;
  addUsersToRole(dto: AddUsersToRoleDto): Promise<AddUsersToRoleResponse>;
  getUsersForRole(dto: GetUsersForRoleDto): Promise<GetUsersForRoleResponse>;
}

class RolesService implements IRolesService {
  async getInitialRolePermissions(dto: GetInitialRolePermissionsDto): Promise<GetInitialRolePermissionsResponse> {
    const resources = await tblResources.findAll({
      include: [
        {
          model: tblPermissions,
          as: 'tblPermissions',
          include: [
            {
              model: tblOperations,
              as: 'operation',
            },
            {
              model: tblRolesPermissions,
              as: 'tblRolesPermissions',
            },
          ],
        },
      ],
    });
    return resources.map(resource => {
      const permissions: PermissionItem[] = resource.tblPermissions.map(permission => {
        return {
          id: permission.id,
          operation: permission.operation.name,
          name: PermissionNameBuilder(resource.name, permission.operation.name),
          isChecked: false,
        };
      });
      const ps = [];
      OPERATION_TYPES.forEach(order => {
        const p = permissions.filter(prm => prm.operation === order)[0];
        if (!p) {
          throw new HttpException(400, 'Please make sure that the operation types: read, write, modify, delete are correct.');
        }
        ps.push(p);
      });
      return {
        resourceName: resource.name,
        permissions: ps,
      };
    });
  }

  async createRole(dto: CreateRoleDto): Promise<CreateRoleResponse> {
    const t = await s.transaction();
    try {
      const keyName = convertNameToKey(dto.name);
      const exists = await tblRoles.findOne({
        where: {
          name: keyName,
        },
      });
      if (exists) {
        throw new HttpException(400, 'Duplicate Role');
      }
      const r = await tblRoles.create(
        {
          keyName: keyName,
          name: dto.name,
          description: dto.description,
          isActive: dto.isActive,
          isSystem: dto.isSystem,
          createdBy: dto.__by.id,
        },
        {
          transaction: t,
        },
      );
      const permissions = await tblPermissions.findAll({
        where: {
          id: dto.permissionIds.map(id => id),
        },
      });
      const arr = findIdsNotExistingIn(
        dto.permissionIds.map(id => id),
        permissions.map(p => p.id),
      );
      if (arr.length > 0) {
        throw new HttpException(400, `The following permission ids do not exist: [${arr.join(', ')}]`);
      }
      const rolePermissions = dto.permissionIds.map(id => {
        return {
          roleId: r.id,
          permissionId: id,
        };
      });
      await tblRolesPermissions.bulkCreate(rolePermissions, {
        transaction: t,
      });
      await createUserLog(dto.__by.id, 'Create Role', `Created role id: ${r.id}`, t);
      await t.commit();
      return {
        id: r.id,
        message: 'Role Created successfully',
      };
    } catch (e) {
      await t.rollback();
      throw e;
    }
  }

  async editRole(dto: EditRoleDto): Promise<EditRoleResponse> {
    const role = await tblRoles.findByPk(dto.id, {
      include: [
        {
          model: tblRolesPermissions,
          as: 'tblRolesPermissions',
        },
      ],
    });
    if (!role) {
      throw new HttpException(404, 'Role not found');
    }
    if (role.keyName === 'owner') {
      throw new HttpException(400, 'You cannot edit owner permissions');
    }
    const t = await s.transaction();
    try {
      const keyName = convertNameToKey(dto.name);
      const exists = await tblRoles.findOne({
        where: {
          id: {
            [Op.not]: dto.id,
          },
          name: keyName,
        },
      });
      if (exists) {
        throw new HttpException(400, 'Duplicate role name');
      }
      await tblRoles.update(
        {
          keyName: keyName,
          name: dto.name,
          description: dto.description,
          isActive: dto.isActive,
          isSystem: dto.isSystem,
          updatedBy: dto.__by.id,
        },
        {
          where: {
            id: dto.id,
          },
          transaction: t,
        },
      );
      await tblRolesPermissions.destroy({
        force: true,
        where: {
          roleId: dto.id,
        },
        transaction: t,
      });

      const rolePermissions = dto.permissionIds.map(id => {
        return {
          roleId: dto.id,
          permissionId: id,
        };
      });
      await tblRolesPermissions.bulkCreate(rolePermissions, {
        transaction: t,
      });
      await createUserLog(dto.__by.id, 'Edit role', `Edited role id: ${role.id}`, t);
      await t.commit();
      return {
        message: 'Role Updated successfully',
      };
    } catch (e) {
      await t.rollback();
      throw e;
    }
  }

  async deleteRole(dto: DeleteRoleDto): Promise<DeleteRoleResponse> {
    const t = await s.transaction();
    try {
      const role = await tblRoles.findByPk(dto.id, {
        include: [
          {
            model: tblRolesPermissions,
            as: 'tblRolesPermissions',
          },
        ],
      });
      if (!role) {
        throw new HttpException(404, 'Role not found');
      }
      const found = await tblUsers.findOne({
        where: {
          roleId: dto.id,
        },
      });
      if (found) {
        throw new HttpException(400, 'The role you are trying to delete belongs to a user');
      }
      await role.destroy({ force: true, transaction: t });
      await createUserLog(dto.__by.id, 'Delete role', `Deleted role with keyName: ${role.keyName}`, t);
      await t.commit();
      return {
        message: 'Role deleted successfully',
      };
    } catch (e) {
      await t.rollback();
      throw e;
    }
  }

  async getRoles(dto: GetRolesDto): Promise<GetRolesResponse> {
    const searchableFields = getSearchFieldsConds(dto.q, ['name']);
    const cond = {
      ...searchableFields,
    };
    if (dto.isActive !== null) {
      cond.isActive = dto.isActive;
    }
    const roles = await tblRoles.findAll({
      where: {
        ...cond,
      },
      include: [
        {
          model: tblUsers,
          as: 'tblUsers',
        },
      ],
    });
    const count = await tblRoles.count({
      where: {
        ...cond,
      },
      include: [
        {
          model: tblUsers,
          as: 'tblUsers',
        },
      ],
    });
    return roles.map(role => {
      return {
        id: role.id,
        keyName: role.keyName,
        name: role.name,
        description: role.description,
        isActive: role.isActive,
        isSystem: role.isSystem,
        totalMembers: count,
        totalMembersText: toReadableNumber(count),
      };
    });
  }

  async getRole(dto: Identifiable): Promise<GetRoleResponse> {
    const role = await tblRoles.findByPk(dto.id);
    if (!role) {
      throw new HttpException(404, 'Role not found');
    }
    if (role.keyName === 'owner') {
      throw new HttpException(400, 'Owners have access to all resources.');
    }
    const resources = await tblResources.findAll({
      include: [
        {
          model: tblPermissions,
          as: 'tblPermissions',
          include: [
            {
              model: tblOperations,
              as: 'operation',
            },
            {
              model: tblRolesPermissions,
              as: 'tblRolesPermissions',
            },
          ],
        },
      ],
    });
    const rolePermissions = await tblRolesPermissions.findAll();
    const isPermissionGranted = (permissionId: number) => {
      const isPermissionGranted = rolePermissions.filter(rolePermission => {
        return rolePermission.roleId === dto.id && rolePermission.permissionId === permissionId;
      });
      return Array.isArray(isPermissionGranted) && isPermissionGranted.length > 0;
    };

    const permissions: RolesPermissionsItem[] = resources.map(resource => {
      const currentPermissions = resource.tblPermissions.map((permission: tblPermissions): PermissionItem => {
        return {
          id: permission.id,
          operation: permission.operation.name,
          name: PermissionNameBuilder(resource.name, permission.operation.name),
          isChecked: isPermissionGranted(permission.id),
        };
      });

      const ps = [];
      OPERATION_TYPES.forEach(order => {
        const p = currentPermissions.filter(prm => prm.operation === order)[0];
        if (!p) {
          throw new HttpException(400, 'Please make sure that the operation types: read, write, modify, delete are correct.');
        }
        ps.push(p);
      });
      return {
        resourceName: resource.name,
        permissions: ps,
      };
    });

    return {
      id: role.id,
      keyName: role.keyName,
      name: role.name,
      description: role.description,
      isActive: role.isActive,
      isSystem: role.isSystem,
      permissions: permissions,
    };
  }

  async addUsersToRole(dto: AddUsersToRoleDto): Promise<AddUsersToRoleResponse> {
    const t = await s.transaction();
    try {
      const users = await tblUsers.findAll({
        where: {
          id: dto.userIds,
        },
      });
      if (users.length < dto.userIds.length) {
        const arr = findIdsNotExistingIn(
          dto.userIds,
          users.map(u => u.id),
        );
        if (arr.length > 0) {
          throw new HttpException(400, `The following user ids do not exist: [${arr.join(', ')}]`);
        }
      }
      await tblUsers.update(
        {
          roleId: dto.id,
          updatedBy: dto.__by.id,
        },
        {
          where: {
            id: dto.userIds,
          },
          transaction: t,
        },
      );
      await t.commit();
      return {
        message: 'Users role added successfully',
      };
    } catch (e) {
      await t.rollback();
      throw e;
    }
  }

  async getUsersForRole(dto: Identifiable): Promise<GetUsersForRoleResponse> {
    const users = await tblUsers.findAll({
      where: {
        isActive: true,
        userName: {
          [Op.ne]: 'super',
        },
      },
    });
    return users.map(user => {
      return {
        id: user.id,
        userName: user.userName,
        fullName: user.fullName,
        belongsToRole: user.roleId === dto.id,
      };
    });
  }

  async getRolesDropdown(dto: GetRolesDropdownListDto): Promise<GetRolesDropdownListResponse> {
    const roles = await tblRoles.findAll({
      order: [['name', 'ASC']],
    });

    return roles.map(role => {
      return {
        id: role.id,
        name: role.isActive ? role.name : role.name + ' (inActive)',
        isActive: role.isActive,
      };
    });
  }
}

export default RolesService;
