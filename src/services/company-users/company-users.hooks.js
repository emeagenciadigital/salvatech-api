const registerRecordsByDefaults = require('./hooks/register-records-by-defaults');
const {fastJoin} = require('feathers-hooks-common');

const joinsResolves = {
  joins: {
    join: () => async (records, context) => {
      if (records.company_id)
        records.company = await context.app
          .service('companies')
          .find({
            query: {id: records.company_id, deletedAt: null},
            paginate: false,
          })
          .then((it) => it[0]);
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
    },
  },
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      (context) => {
        console.log(context.data);
      },

      registerRecordsByDefaults(),
    ],
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
