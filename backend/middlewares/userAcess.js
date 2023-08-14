// Middleware para rota acessível por UsuariosProfessores
const middlewareAcessoProfessores = (request, response, next) => {
  if (request.tipoUsuario === 'UsuariosProfessores') {
    // Se o tipo de usuário for UsuariosProfessores, permita o acesso à página para professores
    next();
  } else {
    // Caso contrário, redirecione ou retorne uma resposta de erro
    response.status(403).send('Acesso não autorizado.');
  }
};

// Middleware para rota acessível por UsuariosAlunos
const middlewareAcessoAlunos = (request, response, next) => {
  if (request.tipoUsuario === 'UsuariosAlunos') {
    // Se o tipo de usuário for UsuariosAlunos, permita o acesso à página para alunos
    next();
  } else {
    // Caso contrário, redirecione ou retorne uma resposta de erro
    response.status(403).send('Acesso não autorizado.');
  }
};

module.exports = {
  middlewareAcessoProfessores,
  middlewareAcessoAlunos,
};