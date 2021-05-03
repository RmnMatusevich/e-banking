const CrudController = require("../crud/crud.controller");

class UserController extends CrudController {
  constructor(usersService) {
    super(usersService);
    this.token = this.token.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.delete = this.delete.bind(this);
    this.getAll = this.getAll.bind(this);
    this.routes["/token"] = [
      {
        method: "get",
        cb: this.token,
      },
    ];
    this.routes["/"] = [
      {
        method: "get",
        cb: this.getAll,
      },
      {
        method: "delete",
        cb: this.delete,
      },
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

  async delete(req, res) {
    return res.json(await this.service.delete(req.query.id, req))
  }

  async getAll(req, res) {
    return res.json(await this.service.getAll(req))
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
