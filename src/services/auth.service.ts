import { compare } from 'bcrypt';
import { HttpException } from '@exceptions/HttpException';
import { TokenData } from '@interfaces/auth.interface';
import { CheckAdminDto, LoginDto } from '@dtos/auth.dto';
import { CheckAdminResponse, GetPermissionsResponse, LoginResponse } from '@/response/auth.response';
import { User } from '@models/user.model';
import { createToken } from '@utils/jwt.util';
import { createUserLog, getUserBy } from '@/utils/user.util';
import { Authenticable } from '@/dtos/main.dto';
import { CheckAdminRequest } from '@/requests/auth.request';
import { tblRoles } from '@/database/models/tblRoles';

interface IAuthService {
  login(dto: LoginDto): Promise<LoginResponse>;
  getPermissions(dto: Authenticable<unknown>): Promise<GetPermissionsResponse>;
  checkAdmin(dto: CheckAdminDto): Promise<CheckAdminResponse>;
}

class AuthService implements IAuthService {
  public async login(dto: LoginDto): Promise<LoginResponse> {
    const user: User = await getUserBy({ userName: dto.userName });
    if (!user) {
      throw new HttpException(401, 'Wrong username/password combination');
    }
    const isPasswordMatching = await compare(dto.password, user.password);
    if (!isPasswordMatching) throw new HttpException(401, 'Wrong username/password combination');
    if (!user.isActive) {
      throw new HttpException(401, 'Wrong username/password combination');
    }
    const tokenData: TokenData = {
      ...createToken({
        id: user.id,
        role: user.role.name,
      }),
    };
    await createUserLog(user.id, 'Login', 'User logged in');
    return {
      message: 'Login successful',
      user: {
        id: user.id,
        userName: user.userName,
        fullName: user.fullName,
        email: user.email,
        image: user.image,
        prefferedLanguage: user.prefferedLanguage,
        prefferedMode: user.prefferedMode,
        isActive: user.isActive,
        role: user.role,
        permissions: user.permissions,
      },
      type: 'Bearer',
      ...tokenData,
    };
  }

  public async getPermissions(dto: Authenticable<unknown>): Promise<GetPermissionsResponse> {
    const user = dto.__by;
    return {
      permissions: user.permissions,
    };
  }

  public async checkAdmin(dto: CheckAdminRequest): Promise<CheckAdminResponse> {
    const user: User = await getUserBy({ userName: dto.userName });
    if (!user) {
      throw new HttpException(401, 'Wrong username/password combination');
    }
    const isPasswordMatching = await compare(dto.password, user.password);
    if (!isPasswordMatching) {
      throw new HttpException(401, 'Wrong username/password combination');
    }
    const userRole = await tblRoles.findByPk(user.role.id);
    if (!userRole.isAdmin) {
      throw new HttpException(400, 'The entered user is not an admin');
    }
    return {
      user: {
        id: user.id,
        userName: user.userName,
        fullName: user.fullName,
        email: user.email,
        image: user.image,
        prefferedLanguage: user.prefferedLanguage,
        prefferedMode: user.prefferedMode,
        isActive: user.isActive,
        role: user.role,
        permissions: user.permissions,
      },
    };
  }
}

export default AuthService;
