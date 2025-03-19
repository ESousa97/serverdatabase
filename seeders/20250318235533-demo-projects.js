'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('projects', [
      {
        titulo: 'Projeto Demo',
        descricao: 'Descrição do projeto demo',
        conteudo: 'Conteúdo do projeto demo',
        categoria: 'Teste',
        data_criacao: Sequelize.literal('CURRENT_TIMESTAMP'),
        data_modificacao: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('projects', null, {});
  }
};
