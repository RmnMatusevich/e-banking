const CrudService = require("../crud/crud.service");
const hash = require("../../helpers/hash");

class UserService extends CrudService {
  constructor(usersRepository, config, errors) {
    super(usersRepository, errors);
    this.usersRepository = usersRepository;
    this.config = config;
  }

  async getAll(req) {
    if (req.user.admin) {
      const users = await this.usersRepository.findAll()
      console.log("users ", users);
      return users
    }
    return this.errors.youNeedToBeAdminToPerformThisAction
  }

  async delete(id, req) {
    if (req.user.admin) {
      const destroy = await this.usersRepository.destroy({
        where: { id: id },
      });
      if (destroy === 0) {
        return this.errors.userDoesNotExist
      }
      return { success: true }
    }
    return this.errors.youNeedToBeAdminToPerformThisAction
  }

  async update(id, data) {
    const user = await this.usersRepository.findByPk(id);
    delete user.dataValues.password;
    return super.update(id, Object.assign(data.body, user));
  }

  async getDataByToken(id) {
    const userRes = await this.usersRepository.findByPk(id);
    const user = userRes.dataValues;
    delete user.password;
    return user;
  }

  async changePassword(id, data) {
    const user = await this.usersRepository.findByPk(id);

    if (hash.isValid(data.oldPassword, user.password)) {
      await this.usersRepository.update(
        { password: hash.get(data.newPassword) },
        { where: { id: id }, limit: 1 }
      );
      return await this.usersRepository.findByPk(id);
    }

    throw this.errors.wrongCredentials;
  }
}

module.exports = UserService;
