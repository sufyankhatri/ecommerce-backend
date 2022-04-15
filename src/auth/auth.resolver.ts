import { Inject } from '@nestjs/common';
import {
    Args,
    Field,
    Mutation,
    ObjectType, Resolver
} from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { AuthService } from './auth.service';

@ObjectType()
@Entity()
class AuthResponse {
  @Field()
  @Column('text')
  access_token: string;
}

@Resolver(of => AuthResponse)
export class AuthResolver {
  constructor(@Inject(AuthService) private authService: AuthService) {}

  @Mutation(returns => AuthResponse)
  login(
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
  ): Promise<AuthResponse> {
    return this.authService.login(email);
  }
}
