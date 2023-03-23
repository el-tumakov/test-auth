import { Injectable, NotFoundException } from '@nestjs/common';

import { FindOneOptions } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

import { User } from '@users/user.entity';

import { CreateUserDto } from '@users/dtos';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: EntityRepository<User>,
  ) {}

  async getUser(id: string): Promise<User> {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.repo.create(createUserDto);

    await this.repo.persistAndFlush(user);

    return user;
  }

  async findById<P extends string = never>(
    id: string,
    opts: FindOneOptions<User, P> = {},
  ) {
    return this.repo.findOne({ id }, opts);
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ email });
  }
}
