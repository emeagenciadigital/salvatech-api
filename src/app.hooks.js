// Application hooks that run for every service
const {
  when,
  softDelete,
  iff,
  isProvider,
  disallow,
  discard,
} = require('feathers-hooks-common');
const authenticate = require('./hooks/authenticate');
const abilities = require("./hooks/abilities")

module.exports = {
  before: {
    all: [ when(
      (hook) =>
        hook.params.provider &&
        `/${hook.path}` !== hook.app.get('authentication').path,
      authenticate,
      abilities(),
    ),],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
