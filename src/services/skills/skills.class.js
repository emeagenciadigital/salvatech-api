const { Service } = require('feathers-objection');

exports.Skills = class Skills extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
