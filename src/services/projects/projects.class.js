const { Service } = require('feathers-knex');

exports.Projects = class Projects extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'projects'
    });
  }
};
