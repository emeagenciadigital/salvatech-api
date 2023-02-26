// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {checkContext, getItems, replaceItems} = require('feathers-hooks-common');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  // Return the actual hook.
  return async (context) => {
    // Throw if the hook is being called from an unexpected location.
    checkContext(context, null, ['patch']);

    // Get the authenticated user.
    // eslint-disable-next-line no-unused-vars
    const {user} = context.params;
    // Get the record(s) from context.data (before), context.result.data or context.result (after).
    // getItems always returns an array to simplify your processing.
    const records = getItems(context);

    const {userAnt} = context;

    const updateUserActivityLogs = ({user}) =>
      context.app
        .service('user-activities-logs')
        .getModel()
        .query()
        .patch({until_status: new Date().toISOString()})
        .where({user_id: user.id})
        .whereNull('until_status')
        .orderBy('createdAt', 'desc')
        .limit(1);

    const createUserActivityLogs = async ({user}) => {
      const companyUsers = await context.app
        .service('company-users')
        .getModel()
        .query()
        .where({user_id: user.id})
        .whereNotNull('date_end')
        .orderBy('createdAt', 'desc')
        .limit(1)
        .then((it) => [0]);

      await context.app
        .service('user-activities-logs')
        .getModel()
        .query()
        .insert({
          user_id: user.id,
          status: 'online',
          company_id: companyUsers.company_id,
        });
    };

    console.log(userAnt, 'userAnt');

    console.log(records.current_status);

    if (
      userAnt.current_status === 'online' &&
      records.current_status === 'offline'
    ) {
      await updateUserActivityLogs({user});
    } else if (
      userAnt.current_status === 'offline' &&
      records.current_status === 'online'
    ) {
      await createUserActivityLogs({user});
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
