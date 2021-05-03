const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const errors = require("./helpers/errors");
const wrap = require("./helpers/wrap");
const hash = require("./helpers/hash");

const UserService = require("./modules/user/user.service");
const AuthenticationService = require("./modules/authentication/authentication.service");
const AccountService = require("./modules/account/account.service");
const DepositService = require("./modules/deposit/deposit.service");
const CreditService = require("./modules/credit/credit.service");

module.exports = (db, config) => {
  const app = express();

  const userService = new UserService(db.User, config, errors);
  const authenticationService = new AuthenticationService(
    db.User,
    db.Admin,
    jwt,
    hash,
    config,
    errors
  );
  const accountService = new AccountService(
    db.Account,
    db.User,
    config,
    errors
  );

  const depositService = new DepositService(
    db.Deposit,
    db.Account,
    config,
    errors
  );

  const creditService = new CreditService(
    db.Credit,
    db.Account,
    config,
    errors
  );

  const logger = require("./global-controllers/logger");
  const authenticator = require("./global-controllers/authentication")(
    jwt,
    wrap,
    config,
    errors
  );
  const authorization = require("./global-controllers/authorization")(
    wrap,
    config,
    errors
  );
  const error = require("./global-controllers/error");

  const apiController = require("./api")(
    userService,
    accountService,
    depositService,
    creditService,
    authenticationService,
    config,
    express
  );

  const getAllDeposits = async () => {
    const deposits = await db.Deposit.findAll();
    deposits.map(async (deposit) => {
      const createdTime = deposit.dataValues.createdAt.getTime();
      const dateNow = Date.now();
      const differenceTime = Math.floor((dateNow - createdTime) / 1000);
      await db.Deposit.update(
        {
          ...deposit.dataValues,
          earnedAmount: (
            deposit.dataValues.amount *
            (deposit.dataValues.percent / 100) *
            differenceTime
          ).toFixed(2),
        },
        {
          where: { id: deposit.dataValues.id },
          limit: 1,
        }
      );
    });
  };

  setInterval(getAllDeposits, 1000 * 10);

  // Mounting
  app.use(cors({ origin: true, credentials: true }));
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(cookieParser("secret key"));
  app.use("/api", logger);
  app.use("/api", authenticator);
  app.use("/api", authorization);
  app.use("/api", apiController);
  app.use("/api", error);
  return app;
};
