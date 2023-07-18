import { User } from '@models/user.model';
import { OmitTimestamps, OmitPassword } from '@dtos/main.dto';
import { Permission } from '@/models/permission.model';

export interface LoginResponse {
  user: UserResponseItem;
  accessToken: String;
  type: String;
  expiresIn: Number;
}

type UserResponseItem = OmitPassword<OmitTimestamps<User>>;

export interface GetPermissionsResponse {
  permissions: Array<Permission>;
}

export type CheckAdminResponse = {
  user: UserResponseItem;
};
