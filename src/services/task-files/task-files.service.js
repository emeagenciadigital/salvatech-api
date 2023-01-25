// Initializes the `task files` service on path `/task-files`
const { TaskFiles } = require('./task-files.class');
const createModel = require('../../models/task-files.model');
const hooks = require('./task-files.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/task-files', new TaskFiles(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('task-files');

  service.hooks(hooks);
};
