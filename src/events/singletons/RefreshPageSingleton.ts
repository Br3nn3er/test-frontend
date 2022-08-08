import { RefreshPage } from '@events/RefreshPage';

class RefreshPageSingleton {
  private static refreshPage: RefreshPage;

  // eslint-disable-next-line no-useless-constructor, no-empty-function, @typescript-eslint/no-empty-function
  private constructor() {}

  static getInstance() {
    if (RefreshPageSingleton.refreshPage) {
      return RefreshPageSingleton.refreshPage;
    }

    RefreshPageSingleton.refreshPage = new RefreshPage();
    return RefreshPageSingleton.refreshPage;
  }
}

export default RefreshPageSingleton;
