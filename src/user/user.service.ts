import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './user.dto';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private userRepository: Repository<UserModel>,
  ) {}

  async createUser(user: User): Promise<UserModel> {
    return this.userRepository.save(user);
  }
  // async updateUser(user: User): Promise<UserModel> {
  //   return this.userRepository.save(user);
  // }

  findAll(): Promise<UserModel[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<UserModel> {
    return this.userRepository.findOne(id);
  }

  findOneByEmail(email: string): Promise<UserModel> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  deleteOne(id: string): Promise<DeleteResult> {
    return this.userRepository.delete({ id });
  }
}
