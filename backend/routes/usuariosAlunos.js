const express = require('express');
const { validationResult } = require('express-validator');

const UsuariosAlunos = require('../models/UsuariosAlunos');
const { compararSenha } = require('../utils/senha');
const { gerarTokenUsuario } = require('../utils/token');
const { checarResultadoValidacao } = require('../validators');
const { validadorCadastroAluno, validadorLoginAlunos } = require('../validators/usuariosAlunos');
const UsuariosProfessores = require('../models/UsuariosProfessores');

const router = express.Router();

const verificarEmailECodigoExistente = async (email, codigo_cref) => {
  const usuario = await UsuariosAlunos.findOne({
    where: {
      email,
    },
  });

  if (usuario) {
    throw new Error('Credenciais inválidas');
  }
};

router.post(
  '/',
  validadorCadastroAluno,
  async (req, res) => {
    if (checarResultadoValidacao(req, res)) {
      return;
    }

    try {
      const { nome, codigo_cref_professor, email, senha } = req.body;

      await verificarEmailECodigoExistente(email);

      const professorExiste = await UsuariosProfessores.findOne({
        where: { codigo_cref: codigo_cref_professor }
      });
  
      if (!professorExiste) {
        return res.status(404).json({ error: 'Código CREF do professor não encontrado.' });
      }

      const resultado = await UsuariosAlunos.create({
        nome,
        codigo_cref_professor,
        email,
        senha,
      });

      const usuario = await UsuariosAlunos.findByPk(resultado.get('id'));

      res.status(201).json(usuario);
    } catch (error) {
      console.warn(error);
      if (error.message === 'Credenciais inválidas') {
        res.status(402).json({ error: 'Credenciais inválidas' });
        return;
      }
      res.status(500).send();
    }
  },
);

router.post(
  '/login',
  validadorLoginAlunos,
  async (req, res) => {
    if (checarResultadoValidacao(req, res)) {
      return;
    }

    try {
      const { email, senha } = req.body;
      
      const usuario = await UsuariosAlunos.unscoped().findOne({
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