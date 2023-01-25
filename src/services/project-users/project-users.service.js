// Initializes the `project users` service on path `/project-users`
const { ProjectUsers } = require('./project-users.class');
const createModel = require('../../models/project-users.model');
const hooks = require('./project-users.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/project-users', new ProjectUsers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('project-users');

  service.hooks(hooks);
};
