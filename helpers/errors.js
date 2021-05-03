const express = require("express");

express.response.error = function (error) {
  if (!error.code) {
    error = {
      message: error.toString(),
      code: "server_error",
      status: 500,
    };
  }

  this.status(error.status).json(error);
};

module.exports = {
  invalidId: {
    message: "Invalid ID",
    code: "invalid_id",
    status: 400,
  },

  userAlreadyExist: {
    message: "user already exist",
    code: "invalid_id",
    status: 400,
  },
  userAlredyBindedWithType: {
    message: "the user has been associated with the type previously",
    code: "Bad Request",
    status: 400,
  },

  nonExistingUser: {
    message: "you are trying to remove a non-existent user",
    code: "invalid_id",
    status: 400,
  },

  notExistingProperty: {
    message: "you are trying to update not existing property",
    code: "invalid_property",
    status: 400,
  },

  notSendRequiredProperty: {
    message: "you don't specify all required values",
    code: "invalid_property",
    status: 400,
  },
  notAllowedLanguage: {
    message: "we don't allowing to create prompt with that language",
    code: "Forbidden",
    status: 403,
  },

  unauthorized: {
    message: "Token are wrong",
    code: "unauthorized",
    status: 401,
  },
  forbidden: {
    message: "Access denied",
    code: "Forbidden",
    status: 403,
  },
  wrongCredentials: {
    message: "Email or password are wrong",
    code: "wrong_credentials",
    status: 404,
  },
  notFound: {
    message: "Entity not found",
    code: "entity_not_found",
    status: 404,
  },
  notUniqueValue: {
    message: "Not unique value",
    code: "not_unique",
    status: 400,
  },
  notEnableAccount: {
    message: "Disable user account",
    code: "disable_user",
    status: 400,
  },
  methodNotAllowed: {
    message: "Method Not Allowed",
    code: "method_not_allowed",
    status: 405,
  },
  depositNotEnoughMoney: {
    message: "Your account not have enough money",
    code: "invalid_deposit_money",
    status: 400,
  },
  wrongAccountId: {
    message: "Wrong accountId",
    code: "invalid_accountId",
    status: 400,
  },
  wrongDepositId: {
    message: "Wrong depositId",
    code: "invalid_depositId",
    status: 400,
  },
  wrongCreditId: {
    message: "Wrong creditId",
    code: "invalid_creditId",
    status: 400,
  },
  userDoesNotExist: {
    message: "User does not exist",
    code: "user_not_exist",
    status: 404,
  },
  youNeedToBeAdminToPerformThisAction: {
    message: "You are need to be an admin, to perform this action",
    code: "not_admin",
    status: 403,
  }
};
