const { Service } = require('feathers-objection');

exports.StandUp = class StandUp extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
