import { VerificationCodeType } from '@/types/VerificationCodeType';
import { CtxType, request } from '@/utils';

export const signin = async (data: { email: string; password: string }, ctx?: CtxType) => {
  return request<{ token: string }>(
    {
      method: 'POST',
      url: `/1.0/auth/signin`,
      data,
    },
    ctx
  );
};

export const signup = async (
  data: { email: string; name: string; password: string },
  ctx?: CtxType
) => {
  return request<{ token: string }>(
    {
      method: 'POST',
      url: `/1.0/auth/signup`,
      data,
    },
    ctx
  );
};

export const checkSession = async (ctx?: CtxType) => {
  return request<{ exists: boolean; auth: boolean }>(
    {
      method: 'GET',
      url: `/1.0/auth/check-session`,
    },
    ctx
  );
};

export const requestNewPassword = async (data: { email: string }, ctx?: CtxType) => {
  return request<VerificationCodeType>(
    {
      method: 'POST',
      url: `/1.0/auth/request-new-password`,
      data,
    },
    ctx
  );
};

export const setNewPassword = async (
  data: { email: string; newPassword: string; code: string },
  ctx?: CtxType
) => {
  return request<{
    valid: boolean;
    reset?: boolean;
    attempts?: number;
    lifeTime?: number;
    holdTime?: number;
    token?: string;
  }>(
    {
      method: 'POST',
      url: `/1.0/auth/set-new-password`,
      data,
    },
    ctx
  );
};

export const logout = async (ctx?: CtxType) => {
  return request<{}>(
    {
      method: 'DELETE',
      url: `/1.0/auth/logout`,
    },
    ctx
  );
};
