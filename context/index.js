module.exports = (Sequelize, config) => {
  const options = {
    host: config.db.host,
    dialect: "postgres",
    logging: false,
    define: {
      timestamps: true,
      paranoid: true,
    },
  };
  const sequelize = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.pass,
    options
  );

  const User = require("../database/models/user")(sequelize, Sequelize);

  // TemplatesLayout.hasOne(Constructor);
  // Constructor.belongsTo(TemplatesLayout);
  // DefaultRecipient.belongsTo(TemplatesData);
  // TemplatesData.hasMany(DefaultRecipient);
  // TemplatesData.belongsTo(TemplatesLayout);
  // TemplatesLayout.hasMany(TemplatesData);
  // UserLookupValues.belongsTo(UserLookup);
  // UserLookup.hasMany(UserLookupValues);

  return {
    user: User,
    sequelize,
    Sequelize,
  };
};
