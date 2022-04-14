import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column, Entity, PrimaryGeneratedColumn
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('text')
  email: string;

  @Field()
  @Column('text')
  password: string;

  @Field()
  @Column('text')
  cpassword: string;
}
