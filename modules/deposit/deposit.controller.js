const CrudController = require("../crud/crud.controller");

class DepositController extends CrudController {
  constructor(depositService) {
    super(depositService);
    this.getAll = this.getAll.bind(this);
    this.close = this.close.bind(this);

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
    this.routes["/close"] = [
      {
        method: "post",
        cb: this.close,
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

  async close(req, res) {
    return res.json(await this.service.close(req, res));
  }

  async delete(req, res) {
    return res.json(await this.service.read(req, res));
  }
}

module.exports = (depositService) => {
  const controller = new DepositController(depositService);

  return controller.router;
};
