"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
        required: true,
      },
      lastName: {
        type: Sequelize.STRING,
        required: true,
      },
      email: {
        type: Sequelize.STRING,
        required: true,
      },
      password: {
        type: Sequelize.STRING,
        required: true,
      },
      phone: {
        type: Sequelize.STRING,
        default: null,
      },
      country: {
        type: Sequelize.STRING,
        default: null,
      },
      city: {
        type: Sequelize.STRING,
        default: null,
      },
      address: {
        type: Sequelize.STRING,
        default: null,
      },
      postalCode: {
        type: Sequelize.STRING,
        default: null,
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
    await queryInterface.dropTable("Users");
  },
};
