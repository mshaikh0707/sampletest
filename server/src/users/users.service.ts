import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) { }


  async create(createUserInput: CreateUserInput) {
    return await this.usersRepository.save(createUserInput);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: string) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    return await this.usersRepository.update({ id }, updateUserInput);
  }

  async remove(id: string) {
    return await this.usersRepository.delete({ id });
  }
}
