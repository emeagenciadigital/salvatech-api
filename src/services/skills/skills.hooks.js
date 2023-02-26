const removeSoftDelete = require('../../hooks/remove-softdelete');
const searchAdminByQ = require('./hooks/search-admin-by-q');

module.exports = {
  before: {
    all: [],
    find: [searchAdminByQ()],
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
