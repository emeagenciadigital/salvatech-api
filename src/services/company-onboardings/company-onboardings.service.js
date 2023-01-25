// Initializes the `company onboardings` service on path `/company-onboardings`
const { CompanyOnboardings } = require('./company-onboardings.class');
const createModel = require('../../models/company-onboardings.model');
const hooks = require('./company-onboardings.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/company-onboardings', new CompanyOnboardings(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('company-onboardings');

  service.hooks(hooks);
};
