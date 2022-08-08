import CookieService from '@services/CookieService';

class CookieServiceSingleton {
  private static service: CookieService;

  // eslint-disable-next-line no-useless-constructor, no-empty-function, @typescript-eslint/no-empty-function
  private constructor() {}

  static getInstance() {
    if (CookieServiceSingleton.service) return CookieServiceSingleton.service;

    CookieServiceSingleton.service = new CookieService();
    return CookieServiceSingleton.service;
  }
}

export default CookieServiceSingleton;
