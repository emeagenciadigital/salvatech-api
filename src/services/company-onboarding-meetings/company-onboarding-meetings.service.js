// Initializes the `company onboarding meetings` service on path `/company-onboarding-meetings`
const { CompanyOnboardingMeetings } = require('./company-onboarding-meetings.class');
const createModel = require('../../models/company-onboarding-meetings.model');
const hooks = require('./company-onboarding-meetings.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/company-onboarding-meetings', new CompanyOnboardingMeetings(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('company-onboarding-meetings');

  service.hooks(hooks);
};
