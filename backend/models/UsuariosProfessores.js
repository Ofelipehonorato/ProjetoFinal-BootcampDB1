const { DataTypes } = require('sequelize');
const sequelize = require('../database/conection');
const { hashSenha} = require('../utils/senha');

const UsuariosProfessores = sequelize.define(
  'professores',
  {
    id: { 
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    codigo_cref: {
      type: DataTypes.NUMBER(10)
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING(500),
      allowNull: false,
      set(value) {
        this.setDataValue('senha', hashSenha(value));
      },
    },
  },
  {
    indexes: [
      {
        name: 'usuario_email_unico',
        unique: true,
        fields: ['email'],
      },
    ],

    createdAt: 'criado_em',
    updatedAt: 'atualizado_em',
    defaultScope: {
      attributes: {
        exclude: ['senha'],
      },
    },
  },
);

module.exports = UsuariosProfessores;
