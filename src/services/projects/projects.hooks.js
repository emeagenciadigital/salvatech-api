const registerCreatedByUserId = require('./hooks/register-created-by-user');
const {fastJoin} = require('feathers-hooks-common');
const removeSoftDelete = require('../../hooks/remove-softdelete');

const joinsResolves = {
  joins: {
    join: () => async (records, context) => {
      [records.company, records.created_by_user] = await Promise.all([
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
            'path_avatar',
            'phone_country_code',
            'phone',
          )
          .where({id: records.created_by_user_id, deletedAt: null})
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
    create: [registerCreatedByUserId()],
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
