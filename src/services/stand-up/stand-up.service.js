// Initializes the `stand up` service on path `/stand-up`
const { StandUp } = require('./stand-up.class');
const createModel = require('../../models/stand-up.model');
const hooks = require('./stand-up.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/stand-up', new StandUp(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('stand-up');

  service.hooks(hooks);
};
