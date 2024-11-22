import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JWT_SECRET_KEY } from '../../../common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Извлекаем токен из заголовка Authorization
      ignoreExpiration: false, // Отключаем игнорирование истекшего токена
      secretOrKey: JWT_SECRET_KEY, // Секретный ключ для проверки токена
    });
  }

  async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }
    return { userId: payload.sub, username: payload.username };
  }
}
