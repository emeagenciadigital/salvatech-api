// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {checkContext, getItems, replaceItems} = require('feathers-hooks-common');
const havePermissions = require('../../../hooks/have-permissions');
const {ROLE_ADMIN} = require('../../../utils/constants');
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
        .select('path_avatar', 'first_name', 'last_name', 'id')
        .where({id: user_id})
        .limit(1)
        .then((it) => it[0]);

    // const [toUser] = await Promise.all([
    //   getUser({user_id: records.to_user_id}),
    //   havePermissions({
    //     user_id: records.from_user_id,
    //     company_id: records.company_id,
    //   })(context),
    //   havePermissions({
    //     user_id: records.to_user_id,
    //     company_id: records.company_id,
    //   })(context),
    // ]);

    console.log(user);
    const fromUser = await getUser({user_id: records.from_user_id});

    records.to_user_avatar_path = user.path_avatar;
    records.from_user_avatar_path = fromUser.path_avatar;
    records.meta_from_full_name = `${fromUser.first_name} ${fromUser.last_name}`;
    records.meta_to_full_name = `${user.first_name} ${user.last_name}`;

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
