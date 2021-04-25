"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Deposit, {
        foreignKey: "accountId",
      });
      this.hasMany(models.Credit, {
        foreignKey: "accountId",
      });
    }
  }
  Account.init(
    {
      address: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
      },
      amount: DataTypes.DOUBLE,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Account",
    }
  );
  return Account;
};
