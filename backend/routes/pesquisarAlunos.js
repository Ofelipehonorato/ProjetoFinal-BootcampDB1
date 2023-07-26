const express = require('express');

const router = express.Router();

const Aluno = require('../models/UsuariosAlunos');

// Rota GET: /pesquisar-alunos?nome=termo_de_pesquisa
router.get('/', async (req, res) => {
    const termoDePesquisa = req.query.nome; // Obtém o termo de pesquisa do parâmetro de consulta "nome"

    try {
        // Realize a busca de alunos pelo nome no banco de dados usando o modelo Aluno
        const alunosEncontrados = await Aluno.findAll({
            where: {
                nome: {
                    [Op.like]: `%${termoDePesquisa}%` // Realiza uma busca com o termo de pesquisa no nome
                }
            }
        });

        // Retorne os alunos encontrados na resposta da requisição
        res.status(200).json(alunosEncontrados);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro ao buscar os alunos.');
    }
});

module.exports = router;