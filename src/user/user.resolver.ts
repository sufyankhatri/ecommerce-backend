import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ForbiddenError } from 'apollo-server-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DeleteResult } from 'typeorm';
import { User } from './user.dto';
import { UserModel } from './user.model';
import { UserService } from './user.service';
import { bcrypt } from 'bcrypt';
@Resolver(of => User)
export class UserResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Query(returns => [UserModel])
  async users(): Promise<UserModel[]> {
    console.log('users');
    return await this.userService.findAll();
  }

  @Mutation(returns => UserModel)
  async createUser(
    @Args('user') user: User,
    @Args('cpassword') cpassword: string,
  ): Promise<UserModel> {
    const ExistingUser = await this.userService.findOneByEmail(user.email);
    if (user.password !== cpassword) {
      throw new Error('passwords do not match');
    }
    const passwordHash = await bcrypt.hash(user.password, '10');
    const finalUser = { ...user, password: passwordHash };
    if (!ExistingUser) {
      return await this.userService.createUser(user);
    } else {
      throw new Error('user already exist ');
    }
  }

  @Mutation(returns => UserModel)
  async deleteUser(@Args('id') id: string): Promise<DeleteResult> {
    return await this.userService.deleteOne(id);
  }
  // async setCurrentRefreshToken(refreshToken: string, userId: string) {
  //   const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
  //   const previousUser  = await this.userService.findOneByEmail()
  //   await this.userService.updateUser(userId, {
  //     currentHashedRefreshToken,
  //   });
  // }
}
