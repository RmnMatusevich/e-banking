class AuthenticationService {
  constructor(userRepository, adminRepository, jwt, hash, config, errors) {
    this.userRepository = userRepository;
    this.adminRepository = adminRepository;
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

  async loginAdmin(data) {
    console.log(this.hash.get(data.password));

    const admin = await this.adminRepository.findOne({
      where: {
        login: data.email,
      },
    });
    if (data.password !== admin.dataValues.password) {
      throw this.errors.wrongCredentials;
    }
    return {
      admin: admin.dataValues,
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
      middleName: data.middleName,
      birthDate: data.birthDate,
      passportSeries: data.passportSeries,
      passportNumber: data.passportNumber,
      passportIssued: data.passportIssued,
      passportIdentity: data.passportIdentity,
      passportDate: data.passportDate,
      phoneHome: data.phoneHome,
      jobPlace: data.jobPlace,
      jobPosition: data.jobPosition,
      placeOfResidence: data.placeOfResidence,
      maritalStatus: data.maritalStatus,
      citizenship: data.citizenship,
      disability: data.disability,
      pensioner: data.pensioner,
      monthlyIncome: data.monthlyIncome,
    };
    const user = await this.userRepository.create(bodyUser);
    return {
      user: user.dataValues,
    };
  }
}
module.exports = AuthenticationService;
