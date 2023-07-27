const { DataTypes } = require('sequelize');
const sequelize = require('../database/conection');
const Professores = require('./UsuariosProfessores')

const UsuariosAlunos = sequelize.define(
  'alunos',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sexo: {
      type: DataTypes.STRING,
      allowNull:false
    },
    idade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    altura: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    peso: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    imc: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    codigo_cref_professor: {
      type:DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em',

    indexes: [
      {
        type: 'FULLTEXT',
        fields: ['nome'],
      },
    ],
  },
);


UsuariosAlunos.hasMany(Professores, {
  foreignKey: 'professorId', // Nome do campo na tabela "aluno" que armazena o id do professor
  as: 'alunos', // Nome da propriedade que será usada para acessar os alunos associados ao professor
});


module.exports = UsuariosAlunos;