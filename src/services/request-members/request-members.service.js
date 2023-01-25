// Initializes the `request members` service on path `/request-members`
const { RequestMembers } = require('./request-members.class');
const createModel = require('../../models/request-members.model');
const hooks = require('./request-members.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/request-members', new RequestMembers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('request-members');

  service.hooks(hooks);
};
