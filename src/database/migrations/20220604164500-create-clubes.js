'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('clubes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cnpj : {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sigla: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    
    return queryInterface.dropTable('clubes');
    
  }
};
