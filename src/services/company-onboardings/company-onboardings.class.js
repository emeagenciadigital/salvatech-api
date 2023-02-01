const { Service } = require('feathers-objection');

exports.CompanyOnboardings = class CompanyOnboardings extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
