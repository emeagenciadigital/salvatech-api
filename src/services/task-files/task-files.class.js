const { Service } = require('feathers-knex');

exports.TaskFiles = class TaskFiles extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'task_files'
    });
  }
};
