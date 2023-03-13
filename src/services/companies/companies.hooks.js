const searchAdminByQ = require('./hooks/search-admin-by-q');
const removeSoftDelete = require('../../hooks/remove-softdelete');
const {fastJoin, paramsFromClient} = require('feathers-hooks-common');

const joinsResolves = {
  joins: {
    join: () => async (records, context) => {
      const knex = context.app.get('knex');
      const query3 = `select (select count(true) as total_online
              from company_users cu
                       INNER join users u on cu.id = u.id
              where current_status = 'online'
                and company_id = ${records.id}
                and cu.deletedAt is null
                and u.deletedAt is null
             ) as total_online,
             (select count(true) as total_online
              from company_users cu
                       INNER join users u on cu.id = u.id
              where current_status = 'offline'
                and company_id = ${records.id}
                  and cu.deletedAt is null
                  and u.deletedAt is null
             ) as total_offline`;
      const totalCurrentStatus = await knex.raw(query3).then((it) => it[0][0]);

      records.total_users_by_current_status = totalCurrentStatus;

      const {my_team_details} = context.params;
      if (my_team_details) {
        const query = `select role_name, count(true) as total
          from company_users
          where company_id = ${records.id}
          group by role_name`;

        records.my_team_details = await knex.raw(query).then((it) => it[0][0]);
      }
    },
  },
};

module.exports = {
  before: {
    all: [],
    find: [searchAdminByQ(), paramsFromClient('my_team_details')],
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
