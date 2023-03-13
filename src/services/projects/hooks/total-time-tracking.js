// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {checkContext, getItems, replaceItems} = require('feathers-hooks-common');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  // Return the actual hook.
  return async (context) => {
    // Throw if the hook is being called from an unexpected location.
    checkContext(context, null, ['find', 'get']);

    // Get the authenticated user.
    // eslint-disable-next-line no-unused-vars
    const {user, totalTimeTrack} = context.params;

    // Get the record(s) from context.data (before), context.result.data or context.result (after).
    // getItems always returns an array to simplify your processing.
    const records = getItems(context);

    const knex = context.app.get('knex');

    // const {totalTimeTrack} = context.params;

    if (totalTimeTrack) {
      const query = `select (select count(true) user_count
            from project_users
            where project_id = ${context.params.query.project_id}
              and deletedAt is null) as user_count,
           (select sum(seconds) as total_time_tracking from task_time_tracking where project_id = ${context.params.query.project_id}) as total_time_tracking
          from projects
          limit 1`;

      context.result = await knex.raw(query).then((it) => it[0][0]);
      context.skipJoins = true;
    }

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
