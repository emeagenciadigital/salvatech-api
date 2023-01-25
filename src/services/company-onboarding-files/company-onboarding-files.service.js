// Initializes the `company onboarding files` service on path `/company-onboarding-files`
const { CompanyOnboardingFiles } = require('./company-onboarding-files.class');
const createModel = require('../../models/company-onboarding-files.model');
const hooks = require('./company-onboarding-files.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/company-onboarding-files', new CompanyOnboardingFiles(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('company-onboarding-files');

  service.hooks(hooks);
};
