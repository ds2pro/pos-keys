import {
  AdminResetPasswordRequest,
  CreateUserRequest,
  EditUserRequest,
  SetUserImageRequest,
  SetUserLanguageRequest,
  SetUserModeRequest,
} from '@/requests/users.request';
import { ActiveQuery, Authenticable, Identifiable, PaginationQuery, SearchQuery } from './main.dto';

export type CreateUserDto = Authenticable<CreateUserRequest>;
export type EditUserDto = Authenticable<Identifiable & EditUserRequest>;
export type DeleteUserDto = Authenticable<Identifiable>;
export type GetUsersDto = Authenticable<PaginationQuery & SearchQuery & ActiveQuery>;
export type GetUserDto = Identifiable;
export type SetUserImageDto = Authenticable<SetUserImageRequest>;
export type SetUserLanguageDto = Authenticable<SetUserLanguageRequest>;
export type SetUserModeDto = Authenticable<SetUserModeRequest>;
export type AdminResetPasswordDto = Authenticable<Identifiable & AdminResetPasswordRequest>;
export type GetUsersDropdownListDto = void;
