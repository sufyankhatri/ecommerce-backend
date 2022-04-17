import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../../constants';
import { UserService } from '../user/user.service';
import { AuthResponse } from './auth.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtTokenService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<AuthResponse> {
    try {
      const user = await this.userService.findOneByEmail(email);
      console.log('user', user);
      if (!user) {
        throw new ForbiddenException('access denied');
      }
      if (user && user.password === password) {
        const { password, ...result } = user;

        const payload = { email: user.email, sub: user.id };

        return {
          access_token: this.jwtTokenService.sign(payload, {
            secret: jwtConstants.accessTokenSecret,
            expiresIn: jwtConstants.accessTokenExpiresIn,
          }),
          refresh_token: this.jwtTokenService.sign(payload, {
            secret: jwtConstants.refreshTokenSecret,
            expiresIn: jwtConstants.refreshTokenExpiresIn,
          }),
        };
        // return result;
      }
    } catch (error) {
      console.log('error', error);
    }
  }
}
