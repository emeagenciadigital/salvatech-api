// Initializes the `professions` service on path `/professions`
const { Professions } = require('./professions.class');
const createModel = require('../../models/professions.model');
const hooks = require('./professions.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/professions', new Professions(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('professions');

  service.hooks(hooks);
};
