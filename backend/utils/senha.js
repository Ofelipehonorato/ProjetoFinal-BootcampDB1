const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

/**
 * @param {string} senha
 * @returns {string}
 */
const hashSenha = (senha) => bcrypt.hashSync(senha, salt);

/**
 * @param {string} senha
 * @param {string} hash
 * @returns {boolean}
 */
const compararSenha = (senha, hash) => bcrypt.compareSync(senha, hash);

module.exports = {
  hashSenha,
  compararSenha,
};
