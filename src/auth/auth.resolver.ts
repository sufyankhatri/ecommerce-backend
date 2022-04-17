import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthResponse } from './auth.model';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Resolver(of => AuthResponse)
export class AuthResolver {
  constructor(@Inject(AuthService) private authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @Mutation(returns => AuthResponse)
  login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<AuthResponse> {
    console.log('email', email, password);
    return this.authService.validateUser(email, password);
  }

  @Mutation(returns => AuthResponse) 
  refreshToken(
    @Args('refreshToken',)
  )
  
}
