const {fastJoin} = require('feathers-hooks-common');
const {paramsFromClient} = require('feathers-hooks-common');
const queryTaskTeamProgress = require('./hooks/query-task-team-progress');

const joinsResolves = {
  joins: {
    join: () => async (records, context) => {
      const {skipJoins} = context;
      if (skipJoins) return context;
      [records.company, records.user, records.project] = await Promise.all([
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
          .where({id: records.user_id, deletedAt: null})
          .then((it) => it[0]),
        context.app
          .service('projects')
          .getModel()
          .query()
          .where({id: records.project_id, deletedAt: null})
          .then((it) => it[0]),
      ]);
    },
  },
};

module.exports = {
  before: {
    all: [],
    find: [paramsFromClient('teamProgress'), queryTaskTeamProgress()],
    get: [],
    create: [],
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
