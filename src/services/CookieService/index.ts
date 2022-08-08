import { destroyCookie, parseCookies, setCookie } from 'nookies';

export enum CookieKey {
  REFRESH_TOKEN = 'sodd.refresh_token',
  TOKEN = 'sodd.token',
}

class CookieService {
  private cookies: { [key: string]: string };

  constructor() {
    this.cookies = parseCookies();
  }

  refresh() {
    this.cookies = parseCookies();
  }

  getToken() {
    return this.cookies[CookieKey.TOKEN];
  }

  getRefreshToken() {
    return this.cookies[CookieKey.REFRESH_TOKEN];
  }

  setToken(token: string, refreshToken: string) {
    // contexto da autenticação (undefined por ser sempre do lado do browser nesse caso) - nome do cookie - valor do token - informacoes adicionais
    setCookie(undefined, CookieKey.TOKEN, token, {
      maxAge: 60 * 60 * 24 * 30, // 30 dias
      path: '/', // quais caminhos da minha aplicação terá acesso ao cookie - com '/' todas as paginas tem acesso a ele
    });

    setCookie(undefined, CookieKey.REFRESH_TOKEN, refreshToken, {
      maxAge: 60 * 60 * 24 * 30, // 30 dias
      path: '/', // quais caminhos da minha aplicação terá acesso ao cookie - com '/' todas as paginas tem acesso a ele
    });

    this.refresh();
  }

  destroy() {
    destroyCookie(undefined, CookieKey.TOKEN);
    destroyCookie(undefined, CookieKey.REFRESH_TOKEN);

    this.refresh();
  }
}

export default CookieService;
