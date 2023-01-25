// Initializes the `task time tracking` service on path `/task-time-tracking`
const { TaskTimeTracking } = require('./task-time-tracking.class');
const createModel = require('../../models/task-time-tracking.model');
const hooks = require('./task-time-tracking.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/task-time-tracking', new TaskTimeTracking(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('task-time-tracking');

  service.hooks(hooks);
};
