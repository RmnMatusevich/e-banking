const CrudService = require("../crud/crud.service");

class DepositService extends CrudService {
  constructor(depositRepository, accountRepository, config, errors) {
    super(depositRepository, errors);
    this.depositRepository = depositRepository;
    this.accountRepository = accountRepository;
    this.config = config;
    this.errors = errors;
  }

  async create(req, res) {
    const account = await this.accountRepository.findByPk(req.body.accountId);
    if (account.dataValues.amount < req.body.amount) {
      return this.errors.depositNotEnoughMoney;
    }

    if (!account) {
      return this.errors.wrongAccountId;
    }

    const updatedAccount = {
      ...account.dataValues,
      amount: account.dataValues.amount - req.body.amount,
    };

    await this.accountRepository.update(updatedAccount, {
      where: { id: req.body.accountId },
      limit: 1,
    });

    const deposit = await this.depositRepository.create({
      ...req.body,
    });
    return deposit.get({ plain: true });
  }

  async close(req, res) {
    const account = await this.accountRepository.findByPk(req.body.accountId);
    const deposit = await this.depositRepository.findByPk(req.body.id);
    if (!account) {
      return this.errors.wrongAccountId;
    } else if (!deposit) {
      return this.errors.wrongDepositId;
    }
    const updatedAccount = {
      ...account.dataValues,
      amount:
        account.dataValues.amount +
        deposit.dataValues.amount +
        deposit.dataValues.earnedAmount,
    };

    await this.accountRepository.update(updatedAccount, {
      where: { id: req.body.accountId },
      limit: 1,
    });

    await this.depositRepository.destroy({
      where: { id: req.body.id },
    });

    return { success: true };
  }

  async getAll(req, res) {
    const items = await this.accountRepository.findByPk(req.query.accountId, {
      include: [
        {
          model: this.depositRepository,
        },
      ],
    });
    return items.Deposits || [];
  }
}

module.exports = DepositService;
