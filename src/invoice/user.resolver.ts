import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUser } from './user.dto';
import { User } from './user.model';
import { UserService } from './user.service';

@Resolver(of => User)
export class InvoiceResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

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
  @Mutation(returns => User)
  async createUser(@Args('user') user: CreateUser): Promise<User> {
    return await this.userService.createUser(user);
  }
}
