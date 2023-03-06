const registerFeedBack = require('./hooks/register-feedback');
const {disallow} = require('feathers-hooks-common');
const tree = require('./hooks/tree');
const {paramsFromClient} = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [],
    find: [paramsFromClient('tree')],
    get: [],
    create: [registerFeedBack()],
    update: [disallow()],
    patch: [disallow()],
    remove: [disallow()],
  },

  after: {
    all: [],
    find: [tree()],
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
