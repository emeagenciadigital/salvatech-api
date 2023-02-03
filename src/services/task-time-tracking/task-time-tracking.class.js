const { Service } = require('feathers-objection');

exports.TaskTimeTracking = class TaskTimeTracking extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
