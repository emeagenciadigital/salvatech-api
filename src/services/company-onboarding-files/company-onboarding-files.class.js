const { Service } = require('feathers-knex');

exports.CompanyOnboardingFiles = class CompanyOnboardingFiles extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'company_onboarding_files'
    });
  }
};
