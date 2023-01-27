const { Service } = require('feathers-objection');

exports.Companies = class Companies extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
