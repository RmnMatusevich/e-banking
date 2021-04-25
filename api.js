module.exports = (
  userService,
  accountService,
  depositService,
  creditService,
  authenticationService,
  config,
  express
) => {
  const router = express.Router();
  const userController = require("./modules/user/user.controller")(userService);
  const accountController = require("./modules/account/account.controller")(
    accountService
  );
  const depositController = require("./modules/deposit/deposit.controller")(
    depositService
  );
  const creditController = require("./modules/credit/credit.controller")(
    creditService
  );
  const authController = require("./modules/authentication/authentication.controller")(
    authenticationService,
    config
  );

  router.use("/auth", authController);
  router.use("/user", userController);
  router.use("/account", accountController);
  router.use("/deposit", depositController);
  router.use("/credit", creditController);
  return router;
};
