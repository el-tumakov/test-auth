import * as bcrypt from 'bcrypt';

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { NotificationsService } from '@notifications/notifications.service';
import { SessionsService } from '@sessions/sessions.service';
import { UsersService } from '@users/users.service';
import { VerificationService } from '@verification/verification.service';

import { AuthSigninDto, AuthSignupDto } from './dtos';
import { RequestNewPasswordDto } from '@auth/dtos/request-new-password.dto';
import { SetNewPasswordDto } from '@auth/dtos/set-new-password.dto';
import {
  VerificationCheckCodeDto,
  VerificationCodeDto,
} from '@verification/dtos';

import { NotificationSenderTypeEnum } from '@notifications/enums';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly sessionsService: SessionsService,
    private readonly notificationsService: NotificationsService,
    private readonly verificationService: VerificationService,
  ) {}

  async signUp(authSignupDto: AuthSignupDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(authSignupDto.password, salt);

    const user = await this.usersService.create({
      ...authSignupDto,
      password: hashedPassword,
    });

    await this.sessionsService.createSession({
      userId: user.id,
    });

    return user;
  }

  async signIn(authSigninDto: AuthSigninDto) {
    const { email, password } = authSigninDto;
    const user = await this.usersService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      await this.sessionsService.createSession({
        userId: user.id,
      });

      return {};
    }

    throw new UnauthorizedException('Please check your login credentials');
  }

  async requestNewPassword(
    requestNewPasswordDto: RequestNewPasswordDto,
  ): Promise<VerificationCodeDto> {
    const { email } = requestNewPasswordDto;

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const code = String(Math.random()).substring(2, 6);

    return this.verificationService.setCode({
      entry: 'auth:newPassword:code',
      code,
      params: {
        maxAttempts: 3,
        lifeTime: 3 * 60 * 1000,
        holdTime: 6 * 60 * 1000,
      },
    });
  }

  async setNewPassword(
    setNewPasswordDto: SetNewPasswordDto,
  ): Promise<VerificationCheckCodeDto> {
    const { email, code } = setNewPasswordDto;

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const verification = await this.verificationService.checkCode(
      'auth:newPassword:code',
      code,
    );

    if (verification.valid) {
      await this.notificationsService.prepareNotification({
        senderType: NotificationSenderTypeEnum.MAIL,
        title: 'Test',
        body: 'Test',
        destinations: [user.email],
        payload: {},
      });
    }

    return verification;
  }

  async logout(sessionId: string) {
    return this.sessionsService.destroySession(sessionId);
  }
}
