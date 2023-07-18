import { Role } from '@models/role.model';
import { Permission } from './permission.model';

export interface User {
  id: number;
  guid?: string;
  fullName?: string;
  userName?: string;
  email?: string;
  image?: string;
  password?: string;
  isActive?: boolean;
  prefferedLanguage?: string;
  prefferedMode?: string;
  role?: Role;
  createdDate?: number;
  updatedDate?: number;
  deletedDate?: number;
  permissions: Array<Permission>;
}

export interface UserSession {
  id: number;
  guid?: string;
  fullName?: string;
  userName?: string;
  email?: string;
}
