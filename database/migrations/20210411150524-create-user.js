"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log(
      Sequelize.INTEGER,
      Sequelize.STRING,
      Sequelize.DATE,
      Sequelize.BOOLEAN
    );
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
      middleName: {
        type: Sequelize.STRING,
        default: null,
      },
      birthDate: {
        type: Sequelize.DATE,
        default: null,
      },
      passportSeries: {
        type: Sequelize.STRING,
        default: null,
      },
      passportNumber: {
        type: Sequelize.STRING,
        default: null,
      },
      passportIssued: {
        type: Sequelize.STRING,
        default: null,
      },
      passportIdentity: {
        type: Sequelize.STRING,
        default: null,
      },
      passportDate: {
        type: Sequelize.DATE,
        default: null,
      },
      phoneHome: {
        type: Sequelize.STRING,
        default: null,
      },
      jobPlace: {
        type: Sequelize.STRING,
        default: null,
      },
      jobPosition: {
        type: Sequelize.STRING,
        default: null,
      },
      placeOfResidence: {
        type: Sequelize.STRING,
        default: null,
      },
      maritalStatus: {
        type: Sequelize.STRING,
        default: null,
      },
      citizenship: {
        type: Sequelize.STRING,
        default: null,
      },
      disability: {
        type: Sequelize.STRING,
        default: null,
      },
      pensioner: {
        type: Sequelize.BOOLEAN,
        default: null,
      },
      monthlyIncome: {
        type: Sequelize.DOUBLE,
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
    await queryInterface.bulkInsert("Users", [
      {
        password:
          "$2a$10$SHyJPLPmCumnVbsIaC5hKObBRhpJnMrGqvZgkJTskWSFm5JxFZyOq",
        firstName: "Konan",
        lastName: "Barabarian",
        email: "user1@gmail.com",
        phone: "+375336545673",
        country: "Belarus",
        city: "Minsk",
        address: "Literatyrnaja 22, 61",
        postalCode: "220113",
        middleName: "Varvarianobich",
        birthDate: new Date(),
        passportSeries: "MP",
        passportNumber: "8769093",
        passportIssued: "23/23",
        passportIdentity: "123123123123",
        passportDate: new Date(),
        phoneHome: "21312323",
        jobPlace: "Pixel Plex",
        jobPosition: "Developer",
        placeOfResidence: "Belarus",
        maritalStatus: "Not married",
        citizenship: "Belarus",
        disability: "none",
        pensioner: false,
        monthlyIncome: 1500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        password:
          "$2a$10$SHyJPLPmCumnVbsIaC5hKObBRhpJnMrGqvZgkJTskWSFm5JxFZyOq",
        firstName: "Horor",
        lastName: "Loofor",
        email: "loofor@gmail.com",
        phone: "+375446536784",
        country: "Belarus",
        city: "Minsk",
        address: "Pushkinskaya 22, 12",
        postalCode: "220113",
        middleName: "Varvarianobich",
        birthDate: new Date(),
        passportSeries: "MP",
        passportNumber: "8769093",
        passportIssued: "23/23",
        passportIdentity: "123123123123",
        passportDate: new Date(),
        phoneHome: "21312323",
        jobPlace: "Pixel Plex",
        jobPosition: "Developer",
        placeOfResidence: "Belarus",
        maritalStatus: "Not married",
        citizenship: "Belarus",
        disability: "none",
        pensioner: false,
        monthlyIncome: 1500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        password:
          "$2a$10$SHyJPLPmCumnVbsIaC5hKObBRhpJnMrGqvZgkJTskWSFm5JxFZyOq",
        firstName: "Igor",
        lastName: "Budionov",
        email: "budionov@gmail.com",
        phone: "+375336665554",
        country: "Belarus",
        city: "Minsk",
        address: "Literatyrnaja 32, 12",
        postalCode: "220123",
        middleName: "Varvarianobich",
        birthDate: new Date(),
        passportSeries: "MP",
        passportNumber: "8769093",
        passportIssued: "23/23",
        passportIdentity: "123123123123",
        passportDate: new Date(),
        phoneHome: "21312323",
        jobPlace: "Pixel Plex",
        jobPosition: "Developer",
        placeOfResidence: "Belarus",
        maritalStatus: "Not married",
        citizenship: "Belarus",
        disability: "none",
        pensioner: false,
        monthlyIncome: 1500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
