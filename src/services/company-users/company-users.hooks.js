const registerRecordsByDefaults = require('./hooks/register-records-by-defaults');
const {fastJoin, paramsFromClient} = require('feathers-hooks-common');
const removeSoftDelete = require('../../hooks/remove-softdelete');

const joinsResolves = {
  joins: {
    join: () => async (records, context) => {
      const knex = context.app.get('knex');
      const {withAdditionalData} = context.params;
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
      if (withAdditionalData) {
        const query = `SELECT status,
       SEC_TO_TIME(SUM(TIMEDIFF(IF(until_status, until_status, CURRENT_TIMESTAMP()), createdAt))) AS total,
       CURRENT_TIMESTAMP()
          FROM user_activities_logs
          WHERE status = 'online'
            and deletedAt is null
            and createdAt > CONCAT(CURRENT_DATE(), ' 00:00:00')
            and user_id = ${records.user_id}`;
        records.totalsTodayHours = await knex
          .raw(query)
          .then((it) => it[0][0].total);
      }
    },
  },
};

module.exports = {
  before: {
    all: [],
    find: [paramsFromClient('withAdditionalData')],
    get: [],
    create: [registerRecordsByDefaults()],
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
