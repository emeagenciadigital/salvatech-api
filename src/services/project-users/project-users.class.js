const { Service } = require('feathers-knex');

exports.ProjectUsers = class ProjectUsers extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'project_users'
    });
  }
};
