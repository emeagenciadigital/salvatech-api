const { Service } = require('feathers-objection');

exports.SupportTickets = class SupportTickets extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
