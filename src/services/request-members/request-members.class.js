const { Service } = require('feathers-objection');

exports.RequestMembers = class RequestMembers extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
