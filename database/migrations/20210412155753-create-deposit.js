"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Deposits", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      address: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
      },
      amount: {
        type: Sequelize.DOUBLE,
      },
      earnedAmount: {
        type: Sequelize.DOUBLE,
        defaultValue: 0,
      },
      percent: {
        type: Sequelize.DOUBLE,
      },
      accountId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Deposits");
  },
};
