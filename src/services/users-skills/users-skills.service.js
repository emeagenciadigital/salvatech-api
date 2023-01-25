// Initializes the `users skills` service on path `/users-skills`
const { UsersSkills } = require('./users-skills.class');
const createModel = require('../../models/users-skills.model');
const hooks = require('./users-skills.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/users-skills', new UsersSkills(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('users-skills');

  service.hooks(hooks);
};
