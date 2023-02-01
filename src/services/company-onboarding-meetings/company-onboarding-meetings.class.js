const { Service } = require('feathers-objection');

exports.CompanyOnboardingMeetings = class CompanyOnboardingMeetings extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
