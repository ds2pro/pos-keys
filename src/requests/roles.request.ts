export interface CreateRoleRequest {
  name: string;
  description: string;
  isActive: boolean;
  isSystem: boolean;
  permissionIds: number[];
}
export type EditRoleRequest = CreateRoleRequest;

export type AddUsersToRoleRequest = {
  userIds: number[];
};
