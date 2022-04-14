import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUser } from './user.dto';
import { User } from './user.model';
import { UserService } from './user.service';

@Resolver(of => User)
export class UserResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Query(returns => [User])
  async users(): Promise<User[]> {
    return await this.userService.findAll();
  }

  // @ResolveField(returns => CustomerModel)
  // async customer(@Parent() invoice) {
  //   const { customer } = invoice;
  //   return this.customerService.findOne(customer);
  // }

  // @Query(returns => [InvoiceModel])
  // async invoices(): Promise<InvoiceModel[]> {
  //   return await this.invoiceService.findAll();
  // }

  // @Mutation(returns => InvoiceModel)
  // async createInvoice(
  //   @Args('invoice') invoice: CreateInvoiceDTO,
  // ): Promise<InvoiceModel> {
  //   return await this.invoiceService.create(invoice);
  // }
  @UseGuards(JwtAuthGuard)
  @Mutation(returns => User)
  async createUser(@Args('user') user: CreateUser): Promise<User> {
    return await this.userService.createUser(user);
  }
}
