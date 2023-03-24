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
import { ValidationException } from '@common/filters';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly sessionsService: SessionsService,
    private readonly notificationsService: NotificationsService,
    private readonly verificationService: VerificationService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();

    return bcrypt.hash(password, salt);
  }

  async validatePassword(
    password: string,
    currentPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, currentPassword);
  }

  async signUp(authSignupDto: AuthSignupDto) {
    const hashedPassword = await this.hashPassword(authSignupDto.password);

    const user = await this.usersService.create({
      ...authSignupDto,
      password: hashedPassword,
    });

    const session = await this.sessionsService.createSession({
      userId: user.id,
    });

    return { token: session.token };
  }

  async signIn(authSigninDto: AuthSigninDto) {
    const { email, password } = authSigninDto;
    const user = await this.usersService.findByEmail(email);
    const isValidPassword = await this.validatePassword(
      password,
      user.password,
    );

    if (!user || !isValidPassword) {
      throw new UnauthorizedException('Please check your login credentials');
    }

    const session = await this.sessionsService.createSession({
      userId: user.id,
    });

    return { token: session.token };
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

    const verification = await this.verificationService.setCode({
      entry: 'auth:newPassword:code',
      code,
      params: {
        maxAttempts: 3,
        lifeTime: 5 * 60 * 1000,
        holdTime: 3 * 60 * 1000,
      },
    });

    if (verification.updated) {
      await this.notificationsService.prepareNotification({
        senderType: NotificationSenderTypeEnum.MAIL,
        title: `Auth code [Tumakov's test auth]`,
        destinations: [user.email],
        payload: {
          code,
        },
        template: '/emails/auth-code.html',
        layout: '/layouts/common-email.html',
      });
    }

    return verification;
  }

  async setNewPassword(
    setNewPasswordDto: SetNewPasswordDto,
  ): Promise<VerificationCheckCodeDto> {
    const { email, newPassword, code } = setNewPasswordDto;

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const verification = await this.verificationService.checkCode(
      'auth:newPassword:code',
      code,
    );

    if (verification.valid) {
      const hashedNewPassword = await this.hashPassword(newPassword);

      await this.usersService.updatePassword(user, hashedNewPassword);

      const session = await this.sessionsService.createSession({
        userId: user.id,
      });

      return { ...verification, token: session.token };
    }

    return verification;
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValidCurrentPassword = await this.validatePassword(
      currentPassword,
      user.password,
    );

    if (!isValidCurrentPassword) {
      throw new ValidationException('Invalid current password');
    }

    const hashedNewPassword = await this.hashPassword(newPassword);

    await this.usersService.updatePassword(user, hashedNewPassword);

    return {};
  }

  async logout(sessionId: string) {
    return this.sessionsService.destroySession(sessionId);
  }
}
