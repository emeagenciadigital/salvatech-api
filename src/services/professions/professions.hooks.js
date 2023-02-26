const {authenticate} = require('@feathersjs/authentication').hooks;
const removeSoftDelete = require('../../hooks/remove-softdelete');
const searchAdminByq = require('./hooks/search-admin-by-q');

module.exports = {
  before: {
    all: [],
    find: [searchAdminByq()],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [removeSoftDelete()],
  },

  after: {
    all: [],
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
