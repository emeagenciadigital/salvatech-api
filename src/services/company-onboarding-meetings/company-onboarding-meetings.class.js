const { Service } = require('feathers-knex');

exports.CompanyOnboardingMeetings = class CompanyOnboardingMeetings extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'company_onboarding_meetings'
    });
  }
};
