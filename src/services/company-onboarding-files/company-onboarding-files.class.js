const { Service } = require('feathers-objection');

exports.CompanyOnboardingFiles = class CompanyOnboardingFiles extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
