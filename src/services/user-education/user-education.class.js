const { Service } = require('feathers-knex');

exports.UserEducation = class UserEducation extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'user_education'
    });
  }
};
