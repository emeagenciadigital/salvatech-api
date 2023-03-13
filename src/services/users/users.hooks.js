const {hashPassword, protect} =
  require('@feathersjs/authentication-local').hooks;
const registerRecordsByDefault = require('../users/hooks/register-records-by-defaults');
const registerRecordsByDefaultPatch = require('../users/hooks/register-records-by-defaults-patch');
const searchAdminByq = require('./hooks/search-admin-by-q');
const {paramsFromClient, fastJoin} = require('feathers-hooks-common');
const removeSoftDelete = require('../../hooks/remove-softdelete');
const initialData = require('./hooks/initial-data');
const registerActivityLogs = require('./hooks/register-activity-logs');
const updateLastActivity = require('./hooks/update-last_activity');

const joinsResolves = {
  joins: {
    join: () => async (records, context) => {
      const {isFavoriteCompanyId, skillsJoin} = context.params;
      const getIsFavorite = ({}) =>
        context.app
          .service('company-users-wish-list')
          .getModel()
          .query()
          .where({company_id: isFavoriteCompanyId, user_id: records.id})
          .limit(1)
          .then((it) => it[0]);

      const companyUsers = ({user_id}) =>
        context.app
          .service('company-users')
          .getModel()
          .query()
          .where({user_id: user_id})
          .then((it) => it);

      if (isFavoriteCompanyId) {
        const companyUserWishList = await getIsFavorite({});
        records.company_users_wish_list = companyUserWishList;
        records.isFavorite = !!companyUserWishList;
      }
      if (skillsJoin) {
        records.skills = await context.app
          .service('users-skills')
          .find({query: {user_id: records.id}})
          .then((it) => it.data);
      }

      records.companies = await companyUsers({user_id: records.id});
    },
  },
};

module.exports = {
  before: {
    all: [],
    find: [
      paramsFromClient('skillsIds', 'isFavoriteCompanyId', 'skillsJoin'),
      searchAdminByq(),
    ],
    get: [],
    create: [hashPassword('password'), registerRecordsByDefault()],
    update: [hashPassword('password'), registerRecordsByDefaultPatch()],
    patch: [hashPassword('password'), initialData()],
    remove: [removeSoftDelete()],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password', 'otp_email_token', 'otp_phone_token'),
    ],
    find: [fastJoin(joinsResolves)],
    get: [fastJoin(joinsResolves)],
    create: [],
    update: [],
    patch: [registerActivityLogs(), updateLastActivity()],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
