export type CreateUserRequest = {
  roleId: number;
  fullName: string;
  userName: string;
  password: string;
  email: string;
  image?: string;
  prefferedLanguage?: string;
  prefferedMode?: string;
  isActive: boolean;
};
export type EditUserRequest = Omit<CreateUserRequest, 'password'>;

export type SetUserImageRequest = {
  image: string;
};
export type SetUserLanguageRequest = {
  prefferedLanguage: string;
};
export type SetUserModeRequest = {
  prefferedMode: string;
};
export type AdminResetPasswordRequest = {
  password: string;
};
