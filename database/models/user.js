"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Account, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      country: DataTypes.STRING,
      city: DataTypes.STRING,
      address: DataTypes.STRING,
      postalCode: DataTypes.STRING,
      middleName: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      passportSeries: DataTypes.STRING,
      passportNumber: DataTypes.STRING,
      passportIssued: DataTypes.STRING,
      passportIdentity: DataTypes.STRING,
      passportDate: DataTypes.DATE,
      phoneHome: DataTypes.STRING,
      jobPlace: DataTypes.STRING,
      jobPosition: DataTypes.STRING,
      placeOfResidence: DataTypes.STRING,
      maritalStatus: DataTypes.STRING,
      citizenship: DataTypes.STRING,
      disability: DataTypes.STRING,
      pensioner: DataTypes.BOOLEAN,
      monthlyIncome: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
