const { Service } = require('feathers-knex');

exports.RequestMembers = class RequestMembers extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'request_members'
    });
  }
};
