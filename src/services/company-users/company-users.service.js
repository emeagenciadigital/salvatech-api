// Initializes the `company users` service on path `/company-users`
const { CompanyUsers } = require('./company-users.class');
const createModel = require('../../models/company-users.model');
const hooks = require('./company-users.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/company-users', new CompanyUsers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('company-users');

  service.hooks(hooks);
};
