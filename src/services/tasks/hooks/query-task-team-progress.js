// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {checkContext, getItems, replaceItems} = require('feathers-hooks-common');
const havePermissions = require('../../../hooks/have-permissions');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  // Return the actual hook.
  return async (context) => {
    // Throw if the hook is being called from an unexpected location.
    checkContext(context, null, ['find']);

    const knex = context.app.get('knex');
    // Get the authenticated user.
    // eslint-disable-next-line no-unused-vars
    const {user} = context.params;
    // Get the record(s) from context.data (before), context.result.data or context.result (after).
    // getItems always returns an array to simplify your processing.
    const records = getItems(context);

    const query = `select (select count(*)
        from tasks
        where status = 'in_progress'
          and createdAt >= date_format(current_timestamp()+INTERVAL -5 HOUR, '%Y-%m-%d')
          and deletedAt is null)                                                                                    as total_tasks_in_progress,
       (select count(*)
        from tasks
        where status = 'completed'
          and createdAt >= date_format(current_timestamp()+INTERVAL -5 HOUR, '%Y-%m-%d')
          and deletedAt is null)                                                                                    as total_tasks_completed,
       (select count(*)
        from tasks
        where status = 'pending'
          and createdAt >= date_format(current_timestamp()+INTERVAL -5 HOUR, '%Y-%m-%d')
          and deletedAt is null)                                                                                    as total_tasks_pending;`;

    context.skipJoins = true;
    context.result = await knex.raw(query).then((it) => it[0][0]);

    // Place the modified records back in the context.
    replaceItems(context, records);
    // Best practice: hooks should always return the context.
    return context;
  };
};

// Throw on unrecoverable error.
// eslint-disable-next-line no-unused-vars
function error(msg) {
  throw new Error(msg);
}
