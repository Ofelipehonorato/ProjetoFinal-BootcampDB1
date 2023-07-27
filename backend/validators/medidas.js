const { checkSchema } = require('express-validator');

const validadorMedidasAluno = checkSchema(
  {
    nome: {
      notEmpty: {
        errorMessage: 'O nome é obrigatório',
      },
      isLength: {
        options: {
          min: 1,
          max: 1000,
        },
        errorMessage: 'O nome deve ter no mínimo 1 e no máximo 100 caracteres',
      },
      isString: {
        errorMessage: 'O nome deve ser uma string',
      },
    },
    sexo: {
      
    },
    idade: {
      notEmpty: {
        errorMessage: 'A idade é obrigatória',
      },
      isNumeric: {
        errorMessage: 'O campo deve ser númerico',
      },
    },
    altura: {
      notEmpty: {
        errorMessage: 'A altura é obrigatória',
      },
      isNumeric: {
        errorMessage: 'O campo deve ser númerico',
      },
    },
    peso: {
      notEmpty: {
        errorMessage: 'O peso é obrigatório',
      },
      isNumeric: {
        errorMessage: 'O campo deve ser númerico',
      },
    },
  },
  ['body'],
);

const validadorAtualizacaoAluno = checkSchema(
  {
    nome: {
      notEmpty: {
        errorMessage: 'O nome é obrigatório',
      },
      isLength: {
        options: {
          min: 1,
          max: 1000,
        },
        errorMessage: 'O nome deve ter no mínimo 1 e no máximo 100 caracteres',
      },
      isString: {
        errorMessage: 'O nome deve ser uma string',
      },
    },
    sexo:{

    },
    idade: {
      notEmpty: {
        errorMessage: 'A idade é obrigatória',
      },
      isNumeric: {
        errorMessage: 'O campo deve ser númerico',
      },
    },
    altura: {
      notEmpty: {
        errorMessage: 'A altura é obrigatória',
      },
      isNumeric: {
        errorMessage: 'O campo deve ser númerico',
      },
    },
    peso: {
      notEmpty: {
        errorMessage: 'O peso é obrigatório',
      },
      isNumeric: {
        errorMessage: 'O campo deve ser númerico',
      },
    },
  },
  ['body'],
);

module.exports = {
  validadorAtualizacaoAluno,
  validadorMedidasAluno,
};
