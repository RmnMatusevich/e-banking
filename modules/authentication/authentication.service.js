class AuthenticationService {
  constructor(userRepository, jwt, hash, config, errors) {
    this.userRepository = userRepository;
    this.jwt = jwt;
    this.hash = hash;
    this.config = config;
    this.errors = errors;
  }

  async getUser(userId) {
    const user = await this.userRepository.findById(userId);
    if (user.enabled) {
      return this.errors.forbidden;
    }
    return user;
  }

  async loginUser(data) {
    const user = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });
    if (!user || !this.hash.isValid(data.password, user.dataValues.password)) {
      throw this.errors.wrongCredentials;
    }
    return {
      user: user.dataValues,
    };
  }

  async registerUser(data) {
    const potentialUser = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });
    if (potentialUser) {
      throw this.errors.notUniqueValue;
    }

    const bodyUser = {
      email: data.email,
      password: this.hash.get(data.password),
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      country: data.country,
      city: data.city,
      address: data.address,
      postalCode: data.postalCode,
    };
    const user = await this.userRepository.create(bodyUser);
    return {
      user: user.dataValues,
    };
  }
}
module.exports = AuthenticationService;
