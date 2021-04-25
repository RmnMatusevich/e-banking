const CrudService = require("../crud/crud.service");
const hash = require("../../helpers/hash");

class AccountService extends CrudService {
  constructor(accountRepository, userRepository, config, errors) {
    super(accountRepository, errors);
    this.accountRepository = accountRepository;
    this.userRepository = userRepository;
    this.config = config;
  }

  async create(req, res) {
    const item = await this.accountRepository.create({
      ...req.body,
      userId: req.user.id,
    });
    return item.get({ plain: true });
  }
  async getAll(req, res) {
    const items = await this.userRepository.findByPk(req.user.id, {
      include: [
        {
          model: this.accountRepository,
        },
      ],
    });
    return items.Accounts || [];
  }
}

module.exports = AccountService;
