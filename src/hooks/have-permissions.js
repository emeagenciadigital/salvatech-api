// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {checkContext, getItems, replaceItems} = require('feathers-hooks-common');
const {Forbidden} = require('@feathersjs/errors');
const {ROLE_ADMIN} = require('../utils/constants');
// eslint-disable-next-line no-unused-vars
module.exports = function (options = {user_id, company_id}) {
  // Return the actual hook.
  return async (context) => {
    // Throw if the hook is being called from an unexpected location.
    checkContext(context, null, ['create']);

    // Get the authenticated user.
    // eslint-disable-next-line no-unused-vars
    const {user} = context.params;
    // Get the record(s) from context.data (before), context.result.data or context.result (after).
    // getItems always returns an array to simplify your processing.
    const records = getItems(context);
    console.log(user);
    const isAdmin = user.main_role === ROLE_ADMIN;

    const getCompanyUser = ({company_id, user_id}) =>
      context.app
        .service('company-users')
        .getModel()
        .query()
        .where({company_id: company_id, user_id: user_id})
        .then((it) => it[0]);

    const companyUser = await getCompanyUser({
      company_id: options.company_id,
      user_id: options.user_id,
    });

    if (!companyUser && !isAdmin)
      throw new Forbidden('no tienes permisos sobre esta empresa');

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
