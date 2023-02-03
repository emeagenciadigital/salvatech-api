const { Service } = require('feathers-objection');

exports.ProjectUsers = class ProjectUsers extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
