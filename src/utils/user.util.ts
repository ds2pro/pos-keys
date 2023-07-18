import { tblOperations } from '@/database/models/tblOperations';
import { tblPermissions } from '@/database/models/tblPermissions';
import { tblResources } from '@/database/models/tblResources';
import { tblRoles } from '@/database/models/tblRoles';
import { tblRolesPermissions } from '@/database/models/tblRolesPermissions';
import { tblUsers } from '@/database/models/tblUsers';
import { tblUsersLog } from '@/database/models/tblUsersLog';
import { Permission } from '@/models/permission.model';
import { User as UserModel } from '@/models/user.model';
import { PermissionNameBuilder } from '@/permissions';
import { Transaction } from 'sequelize';
import { toTimestamp } from './util';

export const getUserBy = async (opts: any): Promise<UserModel> => {
  const isById = !!opts.id;
  const isByUserName = !!opts.userName;
  const cond: any = {};
  if (isById) {
    cond.id = opts.id;
  } else if (isByUserName) {
    cond.userName = opts.userName;
  } else {
    return null;
  }
  const user = await tblUsers.findOne({
    where: {
      ...cond,
    },
    include: [
      {
        model: tblRoles,
        as: 'role',
        include: [
          {
            model: tblRolesPermissions,
            as: 'tblRolesPermissions',
            include: [
              {
                model: tblPermissions,
                as: 'permission',
                include: [
                  {
                    model: tblOperations,
                    as: 'operation',
                  },
                  {
                    model: tblResources,
                    as: 'resource',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
  return (
    user && {
      id: user.id,
      guid: user.guid,
      userName: user.userName,
      password: user.password,
      fullName: user.fullName,
      image: user.image,
      email: user.email,
      prefferedLanguage: user.prefferedLanguage || 'English',
      prefferedMode: user.prefferedMode || 'Light',
      isActive: user.isActive,
      createdDate: toTimestamp(user.createdDate),
      updatedDate: toTimestamp(user.updatedDate),
      role: {
        id: user.role.id,
        keyName: user.role.keyName,
        name: user.role.name,
        description: user.role.description,
        isActive: user.role.isActive,
        isSystem: user.role.isSystem,
      },
      permissions: user.role.tblRolesPermissions.map((rolePermission: tblRolesPermissions): Permission => {
        return {
          id: rolePermission.permissionId,
          name: PermissionNameBuilder(rolePermission.permission.resource.name, rolePermission.permission.operation.name),
          description: rolePermission.permission.value,
          resourceName: rolePermission.permission.resource.name,
          operationName: rolePermission.permission.operation.name,
        };
      }),
    }
  );
};

export const createUserLog = async (userId: number, action: string, description: string, transaction?: Transaction) => {
  await tblUsersLog.create(
    {
      userId: userId,
      action: action,
      description: description,
    },
    {
      transaction: transaction || null,
    },
  );
};
