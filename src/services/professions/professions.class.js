const { Service } = require('feathers-objection');

exports.Professions = class Professions extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
