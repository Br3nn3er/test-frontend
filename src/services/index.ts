import ApiServiceSingleton from './singletons/ApiServiceSingleton';
import CookieServiceSingleton from './singletons/CookieServiceSingleton';
import NavigationServiceSingleton from './singletons/NavigationServiceSingleton';

export const ApiServiceInstance = ApiServiceSingleton.getInstance();
export const CookieServiceInstance = CookieServiceSingleton.getInstance();
export const NavigationServiceInstance =
  NavigationServiceSingleton.getInstance();
