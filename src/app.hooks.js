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

const deleted = softDelete({
  // context is the normal hook context
  deletedQuery: async (context) => {
    if (context.service.getModel) {
      const field = `${context.service.getModel().tableName}.deletedAt`;
      return {[field]: null};
    }
  },
  removeData: async (context) => {
    return {deletedAt: new Date().toISOString()};
  },
});

module.exports = {
  before: {
    all: [
      when(
        (hook) => hook.params.provider && `${hook.path}` !== 'authentication',
        authenticate,
        abilities(),
      ),
    ],
    find: [deleted],
    get: [],
    create: [
      (context) => {
        context.data.deletedAt = null;
        console.log(context.data);
      },
    ],
    update: [],
    patch: [deleted],
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
