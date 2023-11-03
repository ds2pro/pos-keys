import { Identifiable } from '@/dtos/main.dto';
import { Role } from '@/models/role.model';
import { CreateRoleRequest, EditRoleRequest } from '@/requests/roles.request';
import { EmptyResponse, MessageResponse } from './main.response';

export type CreateRoleResponse = Identifiable & MessageResponse;
export type EditRoleResponse = MessageResponse;
export type DeleteRoleResponse = MessageResponse;
export type GetRolesListItem = Role & { totalMembers: number; totalMembersText: string };
export type GetRolesResponse = GetRolesListItem[];
export type GetRoleResponse = Role & {
  permissions: RolesPermissionsItem[];
};

export type GetInitialRolePermissionsResponse = RolesPermissionsItem[];
export interface RolesPermissionsItem {
  resourceName: string;
  permissions: PermissionItem[];
}
export interface PermissionItem {
  id: number;
  name: string;
  operation: string;
  isChecked: boolean;
}

export type AddUsersToRoleResponse = MessageResponse;
export type GetUsersForRoleResponse = {
  id: number;
  userName: string;
  fullName: string;
  belongsToRole: boolean;
}[];

export type GetRolesDropdownListResponse = {
  id: number;
  name: string;
  isActive: boolean;
}[];
