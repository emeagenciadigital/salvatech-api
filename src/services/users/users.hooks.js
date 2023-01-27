const {authenticate} = require('@feathersjs/authentication').hooks;

const {hashPassword, protect} =
  require('@feathersjs/authentication-local').hooks;
const registerRecordsByDefault = require('../users/hooks/register-records-by-defaults');
const registerRecordsByDefaultPatch = require('../users/hooks/register-records-by-defaults-patch');

module.exports = {
  before: {
    all: [],
    find: [],
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
    find: [],
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
