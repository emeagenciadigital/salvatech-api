const { Service } = require('feathers-objection');

exports.UsersSkills = class UsersSkills extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
