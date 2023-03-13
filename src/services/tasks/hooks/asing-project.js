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

    // Get the authenticated user.
    // eslint-disable-next-line no-unused-vars
    const {user} = context.params;
    // Get the record(s) from context.data (before), context.result.data or context.result (after).
    // getItems always returns an array to simplify your processing.
    const records = getItems(context);

    const getProjectUser = ({project_id, user_id, company_id}) =>
      context.app
        .service('projects-users')
        .getModel()
        .query()
        .where({
          project_id,
          user_id,
          company_id,
        })
        .limit(1)
        .then((it) => it[0]);

    const projectUser = await getProjectUser({
      project_id: records.project_id,
      user_id: records.user_id,
      company_id: records.company_id,
    });

    if (!projectUser) {
      await context.app.service('projects-users').create({
        project_id: records.project_id,
        user_id: records.user_id,
        company_id: records.company_id,
      });
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
