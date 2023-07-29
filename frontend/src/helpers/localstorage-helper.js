import JwtDecode from 'jwt-decode';

/**
 * Armazena o token de autenticação na localStorage
 * do navegador.
 *
 * Docs: https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage
 */
const LocalStorageHelper = {
  setToken(token) {
    window.localStorage.setItem('AUTHENTICATION_TOKEN', token);
  },
  getToken() {
    return window.localStorage.getItem('AUTHENTICATION_TOKEN');
  },
  removeToken() {
    window.localStorage.removeItem('AUTHENTICATION_TOKEN');
  },
  isAuthenticated() {
    try {
      const token = LocalStorageHelper.getToken();

      if (!token) return false;

      /**
       * Faz o decode do payload do token para verificar a data de validade.
       *
       * Docs: https://github.com/auth0/jwt-decode
       */
      const payload = JwtDecode(token);

      const expirationDate = new Date(payload.exp * 1000);
      const currentDate = new Date();

      return expirationDate > currentDate;
    } catch (error) {
      console.warn(error);
      return false;
    }
  },
};

export default LocalStorageHelper;
