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
const abilities = require('./hooks/abilities');

module.exports = {
  before: {
    all: [
      when(
        (hook) => hook.params.provider && `${hook.path}` !== 'authentication',
        authenticate,
        abilities(),
      ),
      softDelete({
        // context is the normal hook context
        deletedQuery: async (context) => {
          return {deletedAt: null};
        },
        removeData: async (context) => {
          return {deletedAt: new Date()};
        },
      }),
    ],
    find: [],
    get: [],
    create: [
      (context) => {
        context.data.deletedAt = null;
        console.log(context.data);
      },
    ],
    update: [],
    patch: [],
    remove: [],
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
