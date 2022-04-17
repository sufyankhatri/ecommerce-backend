import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity()
export class AuthResponse {
  @Field()
  @Column('text')
  access_token: string;

  @Field()
  @Column('text')
  refresh_token: string;
}
