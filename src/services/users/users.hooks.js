const {authenticate} = require('@feathersjs/authentication').hooks;

const {hashPassword, protect} =
  require('@feathersjs/authentication-local').hooks;
const registerRecordsByDefault = require('../users/hooks/register-records-by-defaults');
const registerRecordsByDefaultPatch = require('../users/hooks/register-records-by-defaults-patch');
const searchAdminByq = require('./hooks/search-admin-by-q');
const {paramsFromClient, fastJoin} = require('feathers-hooks-common');

const joinsResolves = {
  joins: {
    join: () => async (records, context) => {
      const {isFavoriteCompanyId} = context.params;
      const getIsFavorite = ({}) =>
        context.app
          .service('company-users-wish-list')
          .getModel()
          .query()
          .where({company_id: isFavoriteCompanyId, user_id: records.id})
          .limit(1)
          .then((it) => it[0]);

      if (isFavoriteCompanyId) {
        records.isFavorite = !!(await getIsFavorite({}));
      }
    },
  },
};

module.exports = {
  before: {
    all: [],
    find: [
      paramsFromClient('skillsIds', 'isFavoriteCompanyId'),
      searchAdminByq(),
    ],
    get: [],
    create: [hashPassword('password'), registerRecordsByDefault()],
    update: [hashPassword('password'), registerRecordsByDefaultPatch()],
    patch: [hashPassword('password')],
    remove: [],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password', 'otp_email_token', 'otp_phone_token'),
    ],
    find: [fastJoin(joinsResolves)],
    get: [],
    create: [],
    update: [],
    patch: [],
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
