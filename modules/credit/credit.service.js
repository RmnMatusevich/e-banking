const CrudService = require("../crud/crud.service");
const oneMonthInMs = 1000 * 60 * 60 * 24 * 31;
class CreditService extends CrudService {
  constructor(creditRepository, accountRepository, config, errors) {
    super(creditRepository, errors);
    this.creditRepository = creditRepository;
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
      amount: account.dataValues.amount + req.body.amount,
    };

    await this.accountRepository.update(updatedAccount, {
      where: { id: req.body.accountId },
      limit: 1,
    });
    const credit = await this.creditRepository.create({
      ...req.body,
      amountReceived: 0,
      amountWithPercent:
        req.body.amount + req.body.amount * (req.body.percent / 100),
      amountRemained:
        req.body.amount + req.body.amount * (req.body.percent / 100),
      timeEnd: new Date(Date.now() + oneMonthInMs * req.body.numberOfMonth),
    });
    return credit.get({ plain: true });
  }

  async payFee(req, res) {
    const account = await this.accountRepository.findByPk(req.body.accountId);
    const credit = await this.creditRepository.findByPk(req.body.id);
    if (!account) {
      return this.errors.wrongAccountId;
    } else if (!credit) {
      return this.errors.wrongCreditId;
    }
    const updatedAccount = {
      ...account.dataValues,
      amount: account.dataValues.amount - req.body.amount,
    };

    await this.accountRepository.update(updatedAccount, {
      where: { id: req.body.accountId },
      limit: 1,
    });

    const updatedCredit = {
      ...credit.dataValues,
      amountReceived: credit.dataValues.amountReceived
        ? credit.dataValues.amountReceived + req.body.amount
        : req.body.amount,
      amountRemained: credit.dataValues.amountRemained - req.body.amount,
    };

    await this.creditRepository.update(updatedCredit, {
      where: { id: req.body.id },
      limit: 1,
    });

    return updatedCredit;
  }

  async getAll(req, res) {
    const items = await this.accountRepository.findByPk(req.query.accountId, {
      include: [
        {
          model: this.creditRepository,
        },
      ],
    });
    return items.Credits || [];
  }
}

module.exports = CreditService;
