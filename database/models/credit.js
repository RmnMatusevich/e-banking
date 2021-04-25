"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Credit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Credit.init(
    {
      address: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
      },
      amount: DataTypes.DOUBLE,
      numberOfMonth: DataTypes.INTEGER,
      amountWithPercent: DataTypes.DOUBLE,
      accountId: DataTypes.INTEGER,
      percent: DataTypes.DOUBLE,
      timeEnd: DataTypes.DATE,
      amountReceived: DataTypes.DOUBLE,
      amountRemained: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Credit",
    }
  );
  return Credit;
};
