const { Service } = require('feathers-knex');

exports.TaskTimeTracking = class TaskTimeTracking extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'task_time_tracking'
    });
  }
};
