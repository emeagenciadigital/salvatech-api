const registerFeedBack = require('./hooks/register-feedback');
const {disallow, fastJoin} = require('feathers-hooks-common');
const tree = require('./hooks/tree');
const {paramsFromClient} = require('feathers-hooks-common');

const joinsResolves = {
  joins: {
    join: () => async (records, context) => {
      const getIfHaveParentId = ({parent_id}) =>
        context.app
          .service('feedback')
          .getModel()
          .query()
          .where({parent_id, deletedAt: null})
          .limit(1)
          .then((it) => it[0]);

      const haveParentId = await getIfHaveParentId({parent_id: records.id});

      records.have_reply = !!haveParentId;
    },
  },
};

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
    all: [fastJoin(joinsResolves)],
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
