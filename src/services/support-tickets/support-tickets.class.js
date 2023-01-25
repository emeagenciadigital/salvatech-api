const { Service } = require('feathers-knex');

exports.SupportTickets = class SupportTickets extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'support_tickets'
    });
  }
};
