const { Service } = require('feathers-objection');

exports.UserActivitiesLogs = class UserActivitiesLogs extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
