const { Service } = require('feathers-knex');

exports.CompanyOnboardings = class CompanyOnboardings extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'company_onboardings'
    });
  }
};
