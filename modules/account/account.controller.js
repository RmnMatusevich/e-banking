const CrudController = require("../crud/crud.controller");

class AccountController extends CrudController {
  constructor(accountService) {
    super(accountService);
    this.getAll = this.getAll.bind(this);

    this.routes["/:id"] = [
      {
        method: "get",
        cb: this.get,
      },
      {
        method: "delete",
        cb: this.delete,
      },
    ];
    this.routes["/"] = [
      {
        method: "get",
        cb: this.getAll,
      },
      {
        method: "post",
        cb: this.create,
      },
      {
        method: "patch",
        cb: this.update,
      },
    ];
    this.registerRoutes();
  }

  async update(req, res) {
    return res.json(await this.service.update(req, res));
  }

  async create(req, res) {
    return res.json(await this.service.create(req, res));
  }

  async get(req, res) {
    return res.json(await this.service.read(req, res));
  }

  async getAll(req, res) {
    return res.json(await this.service.getAll(req, res));
  }

  async delete(req, res) {
    return res.json(await this.service.read(req, res));
  }
}

module.exports = (accountService) => {
  const controller = new AccountController(accountService);

  return controller.router;
};
