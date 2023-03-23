import { CtxType, request } from '@/utils';
import { AuthSigninDto, AuthSignupDto } from 'server/src/modules/auth/dtos';

export const signin = async (data: AuthSigninDto, ctx?: CtxType) => {
  return request<{}>(
    {
      method: 'POST',
      url: `/1.0/auth/signin`,
      data,
    },
    ctx
  ).then((response) => {
    return response;
  });
};

export const signup = async (data: AuthSignupDto, ctx?: CtxType) => {
  return request(
    {
      method: 'POST',
      url: `/1.0/auth/signup`,
      data,
    },
    ctx
  ).then((response) => {
    return response;
  });
};
