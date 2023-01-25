const { Service } = require('feathers-knex');

exports.UsersSkills = class UsersSkills extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'users_skills'
    });
  }
};
