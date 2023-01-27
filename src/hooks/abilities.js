const {AbilityBuilder, createMongoAbility, Ability} = require('@casl/ability');
const {createAliasResolver, makeAbilityFromRules} = require('feathers-casl');

const {toMongoQuery} = require('@casl/mongoose');
const {Forbidden} = require('@feathersjs/errors');
const {Logform} = require('winston');
const TYPE_KEY = Symbol.for('type');

const READ = 'read';
const UPDATE = 'update';
const DELETE = 'delete';
const CREATE = 'create';
const USERS = 'users';

function subjectName(subject) {
  if (!subject || typeof subject === 'string') {
    return subject;
  }

  return subject[TYPE_KEY];
}

async function defineAbilitiesFor(user, context) {
  const {rules, can} = AbilityBuilder.extract();
  const ROLE_ADMIN = 'admin';

  const isAdmin = user && user.main_role === ROLE_ADMIN;

  can(CREATE, ['authentication']);

  if (isAdmin) {
    can('manage', ['all']);
  }

  can(READ, [USERS]);
  can('manage', [USERS]);

  if (process.env.NODE_ENV !== 'production') {
    // can('create', ['users']);
  }

  return new Ability(rules, {subjectName});
}

function canReadQuery(query) {
  return query !== null;
}

module.exports = function authorize(name = null) {
  return async function (hook) {
    const action = hook.method;
    const service = name ? hook.app.service(name) : hook.service;
    const serviceName = name || hook.path;
    const ability = await defineAbilitiesFor(hook.params.user, hook);

    const throwUnlessCan = (action, resource) => {
      if (ability.cannot(action, resource)) {
        throw new Forbidden(
          `No estas permitido para hacer ${action} en el servicio de: ${serviceName}`,
        );
      }
    };

    // eslint-disable-next-line require-atomic-updates
    hook.params.ability = ability;

    if (hook.method === 'create') {
      // eslint-disable-next-line require-atomic-updates
      hook.data[TYPE_KEY] = serviceName;
      throwUnlessCan('create', hook.data);
    }

    if (!hook.id) {
      const query = toMongoQuery(ability, serviceName, action);

      if (canReadQuery(query)) {
        Object.assign(hook.params.query, query);
      } else {
        // The only issue with this is that user will see total amount of records in db
        // for the resources which he shouldn't know.
        // Alternative solution is to assign `__nonExistingField` property to query
        // but then feathers-mongoose will send a query to MongoDB which for sure will return empty result
        // and may be quite slow for big datasets
        // eslint-disable-next-line require-atomic-updates
        hook.params.query.$limit = 0;
      }

      return hook;
    }

    const params = Object.assign({}, hook.params, {provider: null});
    const result = await service.get(hook.id, params);

    result[TYPE_KEY] = serviceName;
    throwUnlessCan(action, result);

    if (action === 'get') {
      // eslint-disable-next-line require-atomic-updates
      hook.result = result;
    }

    return hook;
  };
};
