const UsuariosProfessores = require('../models/UsuariosProfessores');
const { validarTokenUsuario } = require('../utils/token');

/**
 * Recebe o valor do cabeçalho Authorization e quebra em partes para obter o token.
 * 
 * Por exemplo, ao receber: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...
 * Retornará: eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...
 *
 * @param {string} authorization
 * @return {string}
 */
const obtemTokenAutenticacao = (authorization) => {
  if (!authorization) return null;

  const partes = authorization.split(' ');
  return partes[1];
};

/**
 * Recebe o token de autenticação e carrega o "usuarioLogado" dentro do request
 * para ser utilizado nas rotas.
 *
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */

const middlewareAutenticacao = async (request, response, next) => {
  const token = obtemTokenAutenticacao(request.headers.authorization);

  if (!token) {
    response.status(401).send('Token não informado.');
    return;
  }

  try {
    const payload = validarTokenUsuario(token);

    const usuario = await UsuariosProfessores.findByPk(payload.id);

    if (!usuario) {
      response.status(401).send('Usuário não autorizado');
      return;
    }

    request.usuarioLogado = usuario.toJSON();

    next();
  } catch (error) {
    console.warn(error);
    response.status(401).send('Token inválido.');
  }
};

module.exports = {
  middlewareAutenticacao,
};


// const middlewareAutenticacao = async (request, response, next) => {
//   const token = obtemTokenAutenticacao(request.headers.authorization);

//   if (!token) {
//     response.status(401).send('Token não informado.');
//     return;
//   }

//   try {
//     const payload = validarTokenUsuario(token);
//     const usuarioId = payload.id;
//     const tipoUsuario = payload.tipo; 

//     console.log(payload.tipo)
//     if (tipoUsuario === 'professor') {
//       const usuario = await UsuariosProfessores.findByPk(usuarioId);

//       if (!usuario) {
//         response.status(401).send('Usuário não autorizado');
//         return;
//       }

//       request.usuarioLogado = usuario.toJSON();
//     } else if (tipoUsuario === 'aluno') {
//       const usuario = await UsuariosAlunos.findByPk(usuarioId);

//       if (!usuario) {
//         response.status(401).send('Usuário não autorizado');
//         return;
//       }

//       request.usuarioLogado = usuario.toJSON();
//     } else {
//       response.status(401).send('Tipo de usuário desconhecido.');
//       return;
//     }

//     next();
//   } catch (error) {
//     console.warn(error);
//     response.status(401).send('Token inválido.');
//   }
// };
// module.exports = {
//   middlewareAutenticacao,
// };
