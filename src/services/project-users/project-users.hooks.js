const removeSoftDelete = require('../../hooks/remove-softdelete');
const {fastJoin, paramsFromClient} = require('feathers-hooks-common');

const joinsResolves = {
  joins: {
    join: () => async (records, context) => {
      const {user} = context.params;
      const {withTotals} = context.params;
      const knex = context.app.get('knex');

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
          'path_avatar',
          'phone_country_code',
          'phone',
          'current_status',
          'last_activity_date',
        )
        .where({id: records.user_id, deletedAt: null})
        .then((it) => it[0]);

      if (withTotals) {
        const query = `select (select count(true) user_count
            from project_users
            where project_id = 1
              and deletedAt is null) as user_count,
           (select sum(seconds) as total_time_tracking from task_time_tracking where project_id = 1) as total_time_tracking
          from projects
          limit 1`;

        records.totals = await knex.raw(query).then((it) => it[0][0]);
      }
    },
  },
};

module.exports = {
  before: {
    all: [],
    find: [paramsFromClient('withTotals')],
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
