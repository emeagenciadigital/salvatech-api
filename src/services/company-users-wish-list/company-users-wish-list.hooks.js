const {fastJoin} = require('feathers-hooks-common');
const {ROLE_ADMIN} = require('../../utils/constants');
const registerCompanyId = require('./hooks/register-companyId');

const joinsResolves = {
  joins: {
    join: () => async (records, context) => {
      const {user} = context.params;
      const isAdmin = user.main_role === ROLE_ADMIN;
      if (isAdmin)
        records.company = await context.app
          .service('companies')
          .find({
            query: {id: records.company_id, deletedAt: null},
            paginate: false,
          })
          .then((it) => it[0]);
      if (isAdmin)
        records.user = await context.app
          .service('users')
          .getModel()
          .query()
          .select(
            'id',
            'first_name',
            'last_name',
            'years_of_experience',
            'profession_id',
            'profession_name',
            'about_me',
            'website_url',
            'path_avatar',
            'phone_country_code',
            'phone',
          )
          .where({id: records.user_id, deletedAt: null})
          .then((it) => it[0]);
    },
  },
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [registerCompanyId()],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [fastJoin(joinsResolves)],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
