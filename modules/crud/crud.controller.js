const express = require("express");

const wrap = require("../../helpers/wrap");

class CrudController {
  constructor(service) {
    this.service = service;

    this.readAll = this.readAll.bind(this);
    this.read = this.read.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);

    this.router = express.Router();
    this.routes = {
      "/crud/:id": [
        {
          method: "get",
          cb: this.read,
        },
        {
          method: "delete",
          cb: this.delete,
        },
      ],
      "/crud/": [
        {
          method: "get",
          cb: this.readAll,
        },
        {
          method: "post",
          cb: this.create,
        },
        {
          method: "patch",
          cb: this.update,
        },
      ],
    };
  }

  async readAll(req, res) {
    res.json(await this.service.readChunk(req.query));
  }

  async read(req, res) {
    res.json(await this.service.read(req.params.id));
  }

  async create(req, res) {
    res.json(await this.service.create(req.body));
  }

  async update(req, res) {
    res.json(await this.service.update(req.body.id, req.body));
  }

  async delete(req, res) {
    res.json(await this.service.delete(req.params.id));
  }

  registerRoutes() {
    Object.keys(this.routes).forEach((route) => {
      let handlers = this.routes[route];

      if (!handlers || !Array.isArray(handlers)) return;

      for (let handler of handlers) {
        this.router[handler.method](route, wrap(handler.cb));
      }
    });
  }
}

module.exports = CrudController;
