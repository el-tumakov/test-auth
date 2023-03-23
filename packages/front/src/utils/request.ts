import { getCookie } from 'cookies-next';

export interface RequestOptions extends RequestInit {
  url: string;
  data?: Record<string, any>;
}

export interface CtxType {
  token?: string;
}

export const request = async <T = any>(opts: RequestOptions, ctx: CtxType = {}): Promise<T> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  opts.body;

  const token = ctx.token || getCookie('tumakov.testauth.token');

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(process.env.NEXT_PUBLIC_SERVER_HOST + opts.url, {
    method: 'GET',
    ...opts,
    body: JSON.stringify(opts.data),
    headers: { ...headers, ...opts.headers },
  }).then(async (response) => {
    const data = await response.json();

    if (!response.ok) {
      throw new Error(response.statusText, { cause: data });
    }

    return data;
  });
};
