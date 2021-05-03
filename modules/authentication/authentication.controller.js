const CrudController = require("../crud/crud.controller");
const jwt = require("jsonwebtoken");
class AuthController extends CrudController {
  constructor(authenticationService, config) {
    super(authenticationService);
    this.loginUser = this.loginUser.bind(this);
    this.loginAdmin = this.loginAdmin.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.logout = this.logout.bind(this);
    this.getUser = this.getUser.bind(this);
    this.config = config;
    this.routes = {
      "/user/login": [
        {
          method: "post",
          cb: this.loginUser,
        },
      ],
      "/admin/login": [
        {
          method: "post",
          cb: this.loginAdmin,
        },
      ],
      "/user/register": [
        {
          method: "post",
          cb: this.registerUser,
        },
      ],
      "/logout": [
        {
          method: "post",
          cb: this.logout,
        },
      ],
    };
    this.registerRoutes();
  }

  async getUser(req, res) {
    return res.json(await this.service.getUser(req.params.id));
  }

  async loginUser(req, res) {
    console.log(this.service.loginUser);
    const data = await this.service.loginUser(req.body);
    let token = await this.getToken(data.user);
    delete data.user.password;
    res.json({
      ...data.user,
      token,
    });
  }

  async loginAdmin(req, res) {    
    const data = await this.service.loginAdmin(req.body);
    console.log("DATA ADMIN", data.admin);
    
    let token = await this.getToken({ ...data.admin, admin: true});
    delete data.admin.password;
    res.json({
      ...data.admin,
      token,
    });
  }

  async registerUser(req, res) {
    const data = await this.service.registerUser(req.body);
    let token = await this.getToken(data.user);
    delete data.user.password;
    res.json({
      ...data.user,
      token,
    });
  }

  async logout(req, res) {
    res.cookie(this.config.cookie.auth, "");
    res.json({
      success: true,
    });
  }

  async getToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email || user.login,
        admin: user.admin || false
      },
      this.config.cookie.key,
      {
        expiresIn: 60 * 60 * 24,
      }
    );
  }
}

module.exports = (authenticationService, config) => {
  const controller = new AuthController(authenticationService, config);
  return controller.router;
};
