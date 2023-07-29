const express = require('express');
const { validationResult } = require('express-validator');

const UsuariosProfessor = require('../models/UsuariosProfessores');
const { compararSenha } = require('../utils/senha');
const { gerarTokenUsuario } = require('../utils/token');
const { checarResultadoValidacao } = require('../validators');
const { validadorCadastroProfessores, validadorLoginProfessores } = require('../validators/usuariosProfessores');

const router = express.Router();

const verificarEmailECodigoExistente = async (codigo_cref, email) => {
  const usuario = await UsuariosProfessor.findOne({
    where: {
      codigo_cref,
      email,
    },
  });

  if (usuario) {
    throw new Error('Credenciais inválidas');
  }
};

router.post(
  '/',
  validadorCadastroProfessores,
  async (req, res) => {
    if (checarResultadoValidacao(req, res)) {
      return;
    }

    try {
      const { nome, codigo_cref, email, senha } = req.body;

      // Use a função de validação personalizada para verificar se o e-mail e Código CREF já existem no banco de dados
      await verificarEmailECodigoExistente(email, codigo_cref);

      const resultado = await UsuariosProfessor.create({
        nome,
        codigo_cref,
        email,
        senha,
      });

      // Declarar a variável "usuario" e buscar o professor pelo ID do resultado
      const usuario = await UsuariosProfessor.findByPk(resultado.get('id'));

      res.status(201).json(usuario); 
    } catch (error) {
      console.warn(error);
      if (error.message === 'Credenciais inválidas') {
        res.status(402).json({ error: 'Credenciais inválidas' });
        return;
      }
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  },
);


router.post(
  '/login',
  validadorLoginProfessores,
  async (req, res) => {
    if (checarResultadoValidacao(req, res)) {
      return;
    }

    try {
      const { email, senha } = req.body;
      
      const usuario = await UsuariosProfessor.unscoped().findOne({
        where: {
          email,
        },
      });

      if (!usuario) {
        res.status(401).send('Credenciais inválidas');
        return;
      }

      if (!compararSenha(senha, usuario.get('senha'))) {
        res.status(401).send('Credenciais inválidas');
        return;
      }

      const usuarioJson = usuario.toJSON();
      delete usuarioJson.senha; 

      const token = gerarTokenUsuario(usuarioJson);

      res.status(200).json({
        token,
        usuario: usuarioJson,
      });
     
    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  },
);

module.exports = router;