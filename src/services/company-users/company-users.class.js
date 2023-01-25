const { Service } = require('feathers-knex');

exports.CompanyUsers = class CompanyUsers extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'company_users'
    });
  }
};
