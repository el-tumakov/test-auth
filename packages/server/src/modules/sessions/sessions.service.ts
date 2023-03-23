import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

import { Session } from '@sessions/session.entity';

import { UsersService } from '@users/users.service';

import { SetSessionDto } from './dtos';

import { randomString } from '@common/utils';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private readonly repo: EntityRepository<Session>,
    private readonly usersService: UsersService,
  ) {}

  async createSession(setSessionDto: SetSessionDto) {
    const { userId, ...data } = setSessionDto;

    if (userId) {
      await this.checkUser(userId);
    }

    const session = this.repo.create({
      ...data,
      user: userId,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 10), // 10 years
    });

    session.token = randomString(128);

    await this.repo.persistAndFlush(session);

    return session;
  }

  async updateSession(id: string, setSessionDto: Partial<SetSessionDto>) {
    const { userId, ...data } = setSessionDto;
    const session = await this.repo.findOne({
      id,
      expiresAt: { $gt: new Date() },
    });

    if (!session) {
      throw new NotFoundException('session not found');
    }

    if (userId) {
      await this.checkUser(userId);
    }

    this.repo.assign(session, { ...data, user: userId || session?.user?.id });

    await this.repo.persistAndFlush(session);

    return session;
  }

  async checkSession(token: string) {
    const session = await this.repo.findOne({ token });

    return { exist: !!session, auth: !!session?.user?.id };
  }

  async destroySession(id: string) {
    const session = await this.repo.findOne({
      id,
      expiresAt: { $gt: new Date() },
    });

    if (!session) {
      throw new NotFoundException('session not found');
    }

    this.repo.assign(session, { expiresAt: new Date() });

    await this.repo.persistAndFlush(session);

    return { exist: false, auth: false };
  }

  async findByToken(token: string) {
    return this.repo.findOne({ token, expiresAt: { $gt: new Date() } });
  }

  async checkUser(id: string) {
    const user = await this.usersService.findById(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }
  }
}
