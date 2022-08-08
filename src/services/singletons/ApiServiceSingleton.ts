import ApiService from '@services/ApiService';

import CookieServiceSingleton from './CookieServiceSingleton';

class ApiServiceSingleton {
  private static service: ApiService;

  // eslint-disable-next-line no-useless-constructor, no-empty-function, @typescript-eslint/no-empty-function
  private constructor() {}

  static getInstance() {
    if (ApiServiceSingleton.service) return ApiServiceSingleton.service;

    const cookieService = CookieServiceSingleton.getInstance();

    ApiServiceSingleton.service = new ApiService(cookieService);
    return ApiServiceSingleton.service;
  }
}

export default ApiServiceSingleton;
