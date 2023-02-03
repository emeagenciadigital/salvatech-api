const { Service } = require('feathers-objection');

exports.TaskFiles = class TaskFiles extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
