import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.model';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtTokenService: JwtService,
  ) {}

  async validateUserCredentials(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtTokenService.sign(payload),
    };
  }
}
