import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthService } from '@auth/auth.service';

import { AuthSession, GetIdentity } from '@auth/decorators';
import { ApiValidation } from '@common/decorators';

import { AuthSigninDto, AuthSignupDto } from '@auth/dtos';
import { RequestNewPasswordDto } from '@auth/dtos/request-new-password.dto';
import { SetNewPasswordDto } from '@auth/dtos/set-new-password.dto';
import { CleanResponseDto } from '@common/dtos';
import {
  VerificationCheckCodeDto,
  VerificationCodeDto,
} from '@verification/dtos';

import { IIdentity } from '@common/interfaces';

@ApiTags('Auth')
@ApiValidation()
@ApiCreatedResponse({ type: CleanResponseDto })
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Signup' })
  @Post('/signup')
  async signUp(@Body() body: AuthSignupDto) {
    await this.authService.signUp(body);

    return {};
  }

  @ApiOperation({ summary: 'Signin' })
  @ApiUnauthorizedResponse({
    description: 'Please check your login credentials',
  })
  @Post('/signin')
  async signIn(@Body() authSigninDto: AuthSigninDto) {
    await this.authService.signIn(authSigninDto);

    return {};
  }

  @ApiOperation({ summary: 'Request new password' })
  @ApiResponse({ type: VerificationCodeDto })
  @Post('/request-new-password')
  async requestNewPassword(
    @Body() requestNewPasswordDto: RequestNewPasswordDto,
  ) {
    return this.authService.requestNewPassword(requestNewPasswordDto);
  }

  @ApiOperation({ summary: 'Set new password' })
  @ApiResponse({ type: VerificationCheckCodeDto })
  @Post('/set-new-password')
  async sendNewPassword(@Body() setNewPasswordDto: SetNewPasswordDto) {
    return this.authService.setNewPassword(setNewPasswordDto);
  }

  @ApiOperation({ summary: 'Logout' })
  @ApiBearerAuth()
  @AuthSession()
  @Post('/logout')
  async logout(@GetIdentity() identity: IIdentity) {
    return this.authService.logout(identity.sessionId);
  }
}
