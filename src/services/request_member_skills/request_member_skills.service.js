// Initializes the `request_member_skills` service on path `/request-member-skills`
const { RequestMemberSkills } = require('./request_member_skills.class');
const createModel = require('../../models/request_member_skills.model');
const hooks = require('./request_member_skills.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/request-member-skills', new RequestMemberSkills(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('request-member-skills');

  service.hooks(hooks);
};
