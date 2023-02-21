const { Service } = require('feathers-objection');

exports.UserWorkExperience = class UserWorkExperience extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
