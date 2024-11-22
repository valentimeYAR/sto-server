import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './entities/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { username, password } = body;

    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.login(user, response);
  }
}
