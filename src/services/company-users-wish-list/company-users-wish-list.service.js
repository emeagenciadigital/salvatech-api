// Initializes the `company users wish list` service on path `/company-users-wish-list`
const { CompanyUsersWishList } = require('./company-users-wish-list.class');
const createModel = require('../../models/company-users-wish-list.model');
const hooks = require('./company-users-wish-list.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/company-users-wish-list', new CompanyUsersWishList(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('company-users-wish-list');

  service.hooks(hooks);
};
