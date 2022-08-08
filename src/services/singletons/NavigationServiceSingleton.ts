import NavigationService from '@services/NavigationService';

class NavigationServiceSingleton {
  private static service: NavigationService;

  // eslint-disable-next-line no-useless-constructor, no-empty-function, @typescript-eslint/no-empty-function
  private constructor() {}

  static getInstance() {
    if (NavigationServiceSingleton.service) {
      return NavigationServiceSingleton.service;
    }

    NavigationServiceSingleton.service = new NavigationService();
    return NavigationServiceSingleton.service;
  }
}

export default NavigationServiceSingleton;
