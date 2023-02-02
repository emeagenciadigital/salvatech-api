const { Service } = require('feathers-objection');

exports.RequestMemberSkills = class RequestMemberSkills extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
