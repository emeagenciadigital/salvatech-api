const {fastJoin} = require('feathers-hooks-common');
const {ROLE_ADMIN} = require('../../utils/constants');
const removeSoftDelete = require('../../hooks/remove-softdelete');

const joinsResolves = {
  joins: {
    join: () => async (records, context) => {
      const {user} = context.params;
      const isAdmin = user.main_role === ROLE_ADMIN;
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
        )
        .where({id: records.user_id, deletedAt: null})
        .then((it) => it[0]);
      if (isAdmin)
        records.company = await context.app
          .service('companies')
          .getModel()
          .query()
          .where({id: records.company_id, deletedAt: null})
          .then((it) => it[0]);
    },
  },
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [removeSoftDelete()],
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
