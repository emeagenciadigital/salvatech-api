// Initializes the `support tickets` service on path `/support-tickets`
const { SupportTickets } = require('./support-tickets.class');
const createModel = require('../../models/support-tickets.model');
const hooks = require('./support-tickets.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/support-tickets', new SupportTickets(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('support-tickets');

  service.hooks(hooks);
};
