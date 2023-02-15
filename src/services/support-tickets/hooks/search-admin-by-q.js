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
    const knex = context.app.get('knex');

    // Get the record(s) from context.data (before), context.result.data or context.result (after).
    // getItems always returns an array to simplify your processing.
    const records = getItems(context);

    if (context.params.query.q && user.main_role === 'admin') {
      const value = context.params.query.q;
      delete context.params.query.q;

      const query = `
        SELECT
          support_tickets.id
          FROM
            support_tickets AS support_tickets
            LEFT JOIN users AS u ON support_tickets.user_id = u.id
            LEFT JOIN companies AS c ON support_tickets.company_id = c.id
          WHERE
            ${
              value
                ? `CONCAT(u.first_name,' ', u.last_name) LIKE '%${value}%'`
                : ''
            }
            or u.phone = "${value}"
            or u.email = "${value}"
            or c.name like "%${value}%"
            AND u.deletedAt IS NULL
            AND c.deletedAt IS NULL`;

      const supportTickets = await knex.raw(query).then((it) => it[0]);

      context.params.query['id'] = {$in: supportTickets.map((it) => it.id)};
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
