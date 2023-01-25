// Initializes the `user education` service on path `/user-education`
const { UserEducation } = require('./user-education.class');
const createModel = require('../../models/user-education.model');
const hooks = require('./user-education.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/user-education', new UserEducation(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('user-education');

  service.hooks(hooks);
};
