import { AddUsersToRoleRequest, CreateRoleRequest, EditRoleRequest } from '@/requests/roles.request';
import { ActiveQuery, Authenticable, Identifiable, SearchQuery } from './main.dto';

export type CreateRoleDto = Authenticable<CreateRoleRequest>;
export type EditRoleDto = Authenticable<Identifiable & EditRoleRequest>;
export type DeleteRoleDto = Authenticable<Identifiable>;
export type GetRolesDto = SearchQuery & ActiveQuery;
export type GetRoleDto = Identifiable;
export type GetInitialRolePermissionsDto = void;
export type AddUsersToRoleDto = Authenticable<Identifiable & AddUsersToRoleRequest>;
export type GetUsersForRoleDto = Identifiable;
export type GetRolesDropdownListDto = void;
