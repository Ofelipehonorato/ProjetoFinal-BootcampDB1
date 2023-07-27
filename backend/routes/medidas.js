const express = require('express');
const { middlewareAutenticacao} = require('../middlewares/authentication');
const Medidas = require('../models/Medidas');  
const { checarResultadoValidacao } = require('../validators');
const { validadorMedidasAluno, validadorAtualizacaoAluno } = require('../validators/medidas');

const router = express.Router();

router.post(
  '/cadastrarmedidas',
  middlewareAutenticacao,
  validadorMedidasAluno,
  async (req, res) => {
    if (checarResultadoValidacao(req, res)) {
      return;
    }

    try {
      const { usuarioLogado, body } = req;

      const { nome, sexo, idade, altura, peso } = body;

      const imc = peso / (altura * altura);

      const imcFormatado = imc.toFixed(2);

      const medidasAluno = await Medidas.create({
        nome,
        sexo,
        idade,
        altura,
        peso,
        imc: parseFloat(imcFormatado), 
        codigo_cref_professor: usuarioLogado.codigo_cref,
      });

      res.status(201).json(medidasAluno);
    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  },
);

/**
 * Consulta de tarefas do usuário logado
 */
router.get(
  '/alunos',
  middlewareAutenticacao,
  async (req, res) => {
    try {
      const { usuarioLogado } = req;

      const alunos = await Medidas.findAll({
        where: {
          codigo_cref_professor: usuarioLogado.codigo_cref,
        },
        attributes: ['id', 'nome', 'sexo', 'idade', 'altura', 'peso', 'imc'],
      }); 

      res.status(200).json(alunos);
    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  },
);

router.patch('/alunos/:id',
 middlewareAutenticacao, 
 async (req, res) => {
  try {
    const { usuarioLogado, params, body } = req;
    const { id } = params; // Captura o ID do aluno a ser atualizado
    const { peso } = body; // Novo valor de peso a ser atualizado

    // Verifica se o aluno com o ID fornecido existe no banco de dados
    const aluno = await Medidas.findByPk(id);
    if (!aluno) {
      res.status(404).json({ error: 'Aluno não encontrado.' });
      return;
    }

    // Verifica se o aluno pertence ao professor logado antes de permitir a atualização
    if (aluno.codigo_cref_professor !== usuarioLogado.codigo_cref) {
      res.status(401).json({ error: 'Você não tem permissão para atualizar as informações deste aluno.' });
      return;
    }

    // Atualiza o valor do peso do aluno
    aluno.peso = peso;
    await aluno.save();

    // Calcula o novo valor do IMC com base no novo peso atualizado
    const imc = aluno.peso / (aluno.altura * aluno.altura);

    // Atualiza o valor do IMC na tabela de medidas
    aluno.imc = parseFloat(imc.toFixed(2));
    await aluno.save();

    res.status(200).json(aluno);
  } catch (error) {
    console.warn(error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});


// /**
//  * Rota de exclusão de tarefas
//  * Delete /tarefas/id
//  */
// router.delete(
//   '/:tarefaId',
//   middlewareAutenticacao,
//   async (req, res) => {
//     try {
//       const { usuarioLogado, params } = req
//       const { tarefaId } = params

//       const result = await Medidas.destroy({
//         where: {
//           id: tarefaId,
//           usuario_id: usuarioLogado.id
//         },
//       });

//       if (!result) {
//         res.status(404).send('Tarefa não encontrada');
//         return;
//       }

//       res.status(204).send()
//     } catch (error) {
//       console.warn(error);
//       res.status(500).send()
//     }
//   }
// );

module.exports = router;
