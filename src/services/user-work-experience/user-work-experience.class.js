const { Service } = require('feathers-knex');

exports.UserWorkExperience = class UserWorkExperience extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'user_work_experience'
    });
  }
};
