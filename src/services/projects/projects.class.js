const { Service } = require('feathers-objection');

exports.Projects = class Projects extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
