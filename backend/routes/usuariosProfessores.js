const express = require('express');
const { ValidationError } = require('sequelize');

const UsuariosProfessor = require('../models/UsuariosProfessores');
const { compararSenha } = require('../utils/senha');
const { gerarTokenUsuario } = require('../utils/token');
const { checarResultadoValidacao } = require('../validators');
const { validadorCadastroProfessores, validadorLoginProfessores } = require('../validators/usuariosProfessores');

const router = express.Router();

function erroEmailDuplicado(error) {
  if (!(error instanceof ValidationError)) {
    return false;
  }

  return error.errors.find((databaseError) => (
    databaseError.type === 'unique violation'
    && databaseError.path === 'usuario_email_unico'
  ));
}

router.post(
  '/',
  validadorCadastroProfessores,
  async (req, res) => {
    if (checarResultadoValidacao(req, res)) {
      return;
    }

    try {
      const { nome, codigo_cref, email, senha } = req.body;

      const resultado = await UsuariosProfessor.create({
        nome,
        codigo_cref,
        email,
        senha,
      });

      const professores = await UsuariosProfessor.findByPk(resultado.get('id'));

      res.status(201).json(professores);
    } catch (error) {
      console.warn(error);
      if (erroEmailDuplicado(error)) {
        res.status(402).send('E-mail já cadastrado!');
        return;
      }
      res.status(500).send();
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