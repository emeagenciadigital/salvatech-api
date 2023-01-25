// Initializes the `user work experience` service on path `/user-work-experience`
const { UserWorkExperience } = require('./user-work-experience.class');
const createModel = require('../../models/user-work-experience.model');
const hooks = require('./user-work-experience.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/user-work-experience', new UserWorkExperience(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('user-work-experience');

  service.hooks(hooks);
};
