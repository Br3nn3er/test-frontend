import { Params } from './types';

class Navigation {
  parseRoute<P = Params, Q = Params>(
    route: string,
    params: P,
    queryParams?: Q,
  ) {
    let newRoute = route;

    Object.entries(params).forEach(([key, value]) => {
      newRoute = newRoute.replace(`:${key}`, value.toString());
    });

    if (queryParams) {
      newRoute = `${newRoute}?${new URLSearchParams(
        queryParams as any,
      ).toString()}`;
    }

    return newRoute;
  }
}

export default Navigation;
