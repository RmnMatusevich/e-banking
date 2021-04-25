"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Deposit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Deposit.init(
    {
      address: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
      },
      amount: DataTypes.DOUBLE,
      earnedAmount: DataTypes.DOUBLE,
      percent: DataTypes.DOUBLE,
      accountId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Deposit",
    }
  );
  return Deposit;
};
