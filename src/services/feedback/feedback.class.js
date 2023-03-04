const { Service } = require('feathers-objection');

exports.Feedback = class Feedback extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
