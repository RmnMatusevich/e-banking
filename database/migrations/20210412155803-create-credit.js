"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Credits", {
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
      numberOfMonth: {
        type: Sequelize.INTEGER,
      },
      percent: {
        type: Sequelize.DOUBLE,
      },
      amountWithPercent: {
        type: Sequelize.DOUBLE,
      },
      accountId: {
        type: Sequelize.INTEGER,
      },
      timeEnd: {
        type: Sequelize.DATE,
      },
      amountReceived: {
        type: Sequelize.DOUBLE,
      },
      amountRemained: {
        type: Sequelize.DOUBLE,
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
    await queryInterface.dropTable("Credits");
  },
};
