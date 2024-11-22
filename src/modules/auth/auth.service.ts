import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.validateUser(username, password);
    if (user) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login(
    user: any,
    response: any,
  ): Promise<{ message: string; token: string }> {
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);
    console.log('token', token);
    response.cookie('access_token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 3600 * 1000,
    });

    return { message: 'Успешний логин', token };
  }
}
