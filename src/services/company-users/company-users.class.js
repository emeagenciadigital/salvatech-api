const { Service } = require('feathers-objection');

exports.CompanyUsers = class CompanyUsers extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
