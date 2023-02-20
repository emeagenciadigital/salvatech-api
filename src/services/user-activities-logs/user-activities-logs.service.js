// Initializes the `user activities logs` service on path `/user-activities-logs`
const { UserActivitiesLogs } = require('./user-activities-logs.class');
const createModel = require('../../models/user-activities-logs.model');
const hooks = require('./user-activities-logs.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/user-activities-logs', new UserActivitiesLogs(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('user-activities-logs');

  service.hooks(hooks);
};
