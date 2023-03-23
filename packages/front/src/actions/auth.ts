import { CtxType, request } from '@/utils';
import { AuthSigninDto, AuthSignupDto } from 'server/src/modules/auth/dtos';

export const signin = async (data: AuthSigninDto, ctx?: CtxType) => {
  return request<{ token: string }>(
    {
      method: 'POST',
      url: `/1.0/auth/signin`,
      data,
    },
    ctx
  );
};

export const signup = async (data: AuthSignupDto, ctx?: CtxType) => {
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

export const logout = async (ctx?: CtxType) => {
  return request<{}>(
    {
      method: 'DELETE',
      url: `/1.0/auth/logout`,
    },
    ctx
  );
};
