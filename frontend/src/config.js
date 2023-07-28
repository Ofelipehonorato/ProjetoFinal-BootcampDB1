import axios from 'axios';
import LocalStorageHelper from './helpers/localstorage-helper';

/**
 * Configura a URL base do backend, pegando o valor da variável de ambiente
 * do arquivo env.development
 *
 * Docs: https://vitejs.dev/guide/env-and-mode.html
 */
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

axios.interceptors.request.use((request) => {
  /**
   * Utiliza um interceptor do axios para injetar automaticamente o token
   * de autenticação na requisição
   *
   * Docs: https://axios-http.com/docs/interceptors
   */
  const token = LocalStorageHelper.getToken();
  if (token) {
    request.headers.authorization = `Bearer ${token}`;
  }
  return request;
});
