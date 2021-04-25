const CrudController = require("../crud/crud.controller");

class UserController extends CrudController {
  constructor(usersService) {
    super(usersService);
    this.token = this.token.bind(this);
    this.changePassword = this.changePassword.bind(this);

    this.routes["/token"] = [
      {
        method: "get",
        cb: this.token,
      },
    ];
    this.routes["/"] = [
      {
        method: "patch",
        cb: this.update,
      },
    ];
    this.routes["/password"] = [
      {
        method: "patch",
        cb: this.changePassword,
      },
    ];

    this.registerRoutes();
  }

  async update(req, res) {
    return res.json(await this.service.update(req.body.id || req.user.id, req));
  }

  async token(req, res) {
    return res.json(
      await this.service.getDataByToken(req.user.id, req.params.id)
    );
  }

  async changePassword(req, res) {
    return res.json(await this.service.changePassword(req.user.id, req.body));
  }
}

module.exports = (usersService) => {
  const controller = new UserController(usersService);

  return controller.router;
};
