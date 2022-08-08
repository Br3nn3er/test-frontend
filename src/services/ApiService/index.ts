import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import Router from 'next/router';

import { RefreshPageInstance } from '@events/index';

import CookieService from '@services/CookieService';

class ApiService {
  readonly axios: AxiosInstance;

  readonly TOKEN_ERROR_MESSAGES = ['Token não encontrado!', 'Token invalido!'];

  private cookieService: CookieService;

  private isRefreshing: boolean;

  constructor(cookieService: CookieService) {
    const { NEXT_PUBLIC_API_URL } = process.env;

    this.isRefreshing = false;

    this.cookieService = cookieService;

    this.axios = axios.create({
      baseURL: NEXT_PUBLIC_API_URL,
      headers: {
        Authorization: `Bearer ${this.cookieService.getToken()}`,
      },
    });

    this.responseErrorInterceptor = this.responseErrorInterceptor.bind(this);

    this.axios.interceptors.response.use(
      this.responseInterceptor,
      this.responseErrorInterceptor,
    );
  }

  setTokenHeader(token: string) {
    (this.axios.defaults.headers as any).Authorization = `Bearer ${token}`;
  }

  async refreshToken() {
    try {
      const refreshToken = this.cookieService.getRefreshToken();
      const { data } = await this.axios.post('/refresh-token', {
        refreshToken,
      });
      // eslint-disable-next-line camelcase
      const { refresh_token, token } = data;

      this.cookieService.setToken(token, refresh_token);
      this.setTokenHeader(token);

      RefreshPageInstance.trigger();
    } finally {
      this.isRefreshing = false;
    }
  }

  private async responseErrorInterceptor(error: AxiosError) {
    const { response } = error;
    const { data, status } = response;

    if (status !== 401) {
      // TODO: REMOVE
      this.cookieService.destroy();
      Router.push('/');

      return Promise.reject(error);
    }

    if (this.TOKEN_ERROR_MESSAGES.includes(data?.message)) {
      this.cookieService.refresh();

      if (!this.isRefreshing) {
        this.isRefreshing = true;
        await this.refreshToken();
      }

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }

  private responseInterceptor(response: AxiosResponse) {
    return response;
  }
}

export default ApiService;
