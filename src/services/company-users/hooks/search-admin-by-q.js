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
    const {user} = context.params;
    // Get the record(s) from context.data (before), context.result.data or context.result (after).
    // getItems always returns an array to simplify your processing.
    const records = getItems(context);

    const knex = context.app.get('knex');

    if (context.params.query.q) {
      const value = context.params.query.q;
      delete context.params.query.q;

      const query = `select company_users.id
        from company_users
                 INNER JOIN companies c on company_users.company_id = c.id
        INNER JOIN users u on company_users.user_id = u.id
        where
       concat(u.first_name,' ',u.last_name) like '%${value}%' or
      c.name like '%${value}%'
      
      and u.deletedAt is null
      and c.deletedAt is null
      and company_users. deletedAt is null`;

      const companiesUsersIds = await knex
        .raw(query)
        .then((it) => it[0].map((it) => it.id));

      context.params.query['id'] = {$in: companiesUsersIds};
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
