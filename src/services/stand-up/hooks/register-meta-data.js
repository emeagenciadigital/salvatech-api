// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const {ROLE_ADMIN} = require('../../../utils/constants');
const {checkContext, getItems, replaceItems} = require('feathers-hooks-common');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
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

    const getUser = ({user_id}) =>
      context.app
        .service('users')
        .getModel()
        .query()
        .where({id: user_id})
        .then((it) => it[0]);

    const isAdmin = user.main_role === ROLE_ADMIN;

    if (isAdmin) {
      const metaUser = await getUser({user_id: records.user_id});
      records.meta_user_first_name = metaUser.first_name;
      records.meta_user_last_name = metaUser.last_name;
      records.meta_user_path_avatar = metaUser.path_avatar;
    } else {
      records.meta_user_first_name = user.first_name;
      records.meta_user_last_name = user.last_name;
      records.meta_user_path_avatar = user.path_avatar;
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
