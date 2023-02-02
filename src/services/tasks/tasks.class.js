const { Service } = require('feathers-objection');

exports.Tasks = class Tasks extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
