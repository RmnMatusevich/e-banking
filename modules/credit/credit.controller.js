const CrudController = require("../crud/crud.controller");

class CreditController extends CrudController {
  constructor(creditService) {
    super(creditService);
    this.getAll = this.getAll.bind(this);
    this.payFee = this.payFee.bind(this);

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
    this.routes["/payfee"] = [
      {
        method: "post",
        cb: this.payFee,
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

  async payFee(req, res) {
    return res.json(await this.service.payFee(req, res));
  }

  async delete(req, res) {
    return res.json(await this.service.read(req, res));
  }
}

module.exports = (creditService) => {
  const controller = new CreditController(creditService);

  return controller.router;
};
