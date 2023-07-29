/**
 * Expressão regular para verificar se o e-mail está no formato válido.
 */
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const validateEmail = (text) => {
  const valido = EMAIL_REGEX.test(text);
  if (!valido) {
    return 'E-mail inválido';
  }
  return undefined;
};

export const validatePassword = (text) => {
  if (!text || !text.length) {
    return 'Senha é obrigatória';
  }
  if (text.length < 8 || text.length > 16) {
    return 'Senha deve ter entre 8 e 16 caracteres';
  }
  return undefined;
};

export const validateName = (text) => {
  if (!text || !text.length) {
    return 'O nome é obrigatório';
  }
  if (text.length < 3 || text.length > 200) {
    return 'O nome deve ter entre 3 e 200 caracteres';
  }
  return undefined;
};
