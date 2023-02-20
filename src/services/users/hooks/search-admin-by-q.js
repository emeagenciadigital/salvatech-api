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
    const {user, skillsIds} = context.params;
    // Get the record(s) from context.data (before), context.result.data or context.result (after).
    // getItems always returns an array to simplify your processing.
    const records = getItems(context);

    if (context.params.query.q && user.main_role === 'admin') {
      const value = context.params.query.q;
      delete context.params.query.q;

      const usersIds = await context.app
        .service('users')
        .getModel()
        .query()
        .select('users.id')
        .orWhere('users.first_name', 'LIKE', `%${value}%`)
        .orWhere('users.last_name', 'LIKE', `%${value}%`)
        .orWhere('users.phone', 'LIKE', `%${value}%`)
        .orWhere('users.email', 'LIKE', `%${value}%`)
        .where({'users.deletedAt': null})
        .then((it) => it.map((it) => it.id));

      context.params.query['id'] = {$in: usersIds};
    }

    if (user.main_role === 'admin' && skillsIds) {
      const value = context.params.query.q;
      delete context.params.query.q;

      const usersIds = await context.app
        .service('users')
        .getModel()
        .query()
        .select('users.id')
        .innerJoin('users_skills', 'users.id', '=', 'users_skills.user_id')
        .whereIn('users_skills.skill_id', skillsIds)
        .orWhere('users.first_name', 'LIKE', `%${value}%`)
        .orWhere('users.last_name', 'LIKE', `%${value}%`)
        .orWhere('users.phone', 'LIKE', `%${value}%`)
        .orWhere('users.email', 'LIKE', `%${value}%`)
        .where({'users.deletedAt': null})
        .then((it) => it.map((it) => it.id));

      context.params.query['id'] = {$in: usersIds};
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
