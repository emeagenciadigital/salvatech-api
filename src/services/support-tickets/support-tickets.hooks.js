const registerUser = require('./hooks/register-user');
const {fastJoin} = require('feathers-hooks-common');

const joinsResolves = {
  joins: {
    join: () => async (records, context) => {
      [records.company, records.user] = await Promise.all([
        context.app
          .service('companies')
          .find({
            query: {id: records.company_id, deletedAt: null},
            paginate: false,
          })
          .then((it) => it[0]),
        context.app
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
          .then((it) => it[0]),
      ]);
    },
  },
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [registerUser()],
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
