const { Service } = require('feathers-knex');

exports.Tasks = class Tasks extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'tasks'
    });
  }
};
