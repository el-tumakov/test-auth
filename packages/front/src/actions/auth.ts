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

export const logout = async (ctx?: CtxType) => {
  return request<{}>(
    {
      method: 'DELETE',
      url: `/1.0/auth/logout`,
    },
    ctx
  );
};
