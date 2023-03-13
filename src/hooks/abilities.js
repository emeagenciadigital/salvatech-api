const {AbilityBuilder, createMongoAbility, Ability} = require('@casl/ability');
const {$or} = require('@ucast/mongo2js');

const {toMongoQuery} = require('@casl/mongoose');
const {Forbidden} = require('@feathersjs/errors');
const TYPE_KEY = Symbol.for('type');

const READ = ['find', 'get'];
const UPDATE = 'update';
const DELETE = 'delete';
const CREATE = 'create';
const MANAGE = 'manage';

const USERS = 'users';
const COMPANY_USERS = 'company-users';
const COMPANY_USERS_WISH_LIST = 'company-users-wish-list.model';
const PROFESSIONS = 'professions';
const SKILLS = 'skills';
const USER_SKILLS = 'users-skills';
const USERS_EDUCATIONS = 'users-educations';
const TASK = 'tasks';
const TASK_TIME_TRACKING = 'task-time-tracking';
const TASK_FILES = 'task-files';
const PROJECT_USERS = 'project-users';
const PROJECT = 'projects';
const REQUEST_MEMBERS = 'request-members';
const STAND_UP = 'stand-up';
const SUPPORT_TICKETS = 'support-tickets';
const USER_WORK_EXPERIENCE = 'user-work-experience';
const FEEDBACK = 'feedback';
const COMPANY_ONBOARDINGS = 'company-onboardings';

function subjectName(subject) {
  if (!subject || typeof subject === 'string') {
    return subject;
  }

  return subject[TYPE_KEY];
}

const getCompanies = ({context, user_id}) =>
  context.app
    .service('company-users')
    .getModel()
    .query()
    .where({user_id: user_id, deletedAt: null})
    .then((it) => it);

const getRequestMembers = ({context, company_id}) =>
  context.app
    .service('request-members')
    .getModel()
    .query()
    .where({company_id: company_id, deletedAt: null})
    .then((it) => it);

const getCompanyOnboardings = ({context, company_id}) =>
  context.app
    .service('company-onboardings')
    .getModel()
    .query()
    .where({company_id: company_id, deletedAt: null})
    .then((it) => it);

const getMyTasks = ({context, user_id}) =>
  context.app
    .service('tasks')
    .getModel()
    .query()
    .where({user_id: user_id, deletedAt: null})
    .then((it) => it);

async function defineAbilitiesFor(user, context) {
  const {rules, can} = AbilityBuilder.extract();
  const ROLE_ADMIN = 'admin';

  const isAdmin = user && user.main_role === ROLE_ADMIN;

  can(CREATE, ['authentication']);

  can(CREATE, [SUPPORT_TICKETS, STAND_UP]);

  if (isAdmin) {
    can('manage', ['all']);
    return new Ability(rules, {subjectName});
  }

  if (user) {
    can([CREATE], [FEEDBACK]);

    can(READ, FEEDBACK, {
      $or: [{from_user_id: user.id}, {to_user_id: user.id}],
    });

    can(READ, [PROFESSIONS, SKILLS]);
    can(
      MANAGE,
      [
        COMPANY_USERS_WISH_LIST,
        USER_SKILLS,
        USERS_EDUCATIONS,
        USER_WORK_EXPERIENCE,
      ],
      {
        user_id: user.id,
      },
    );
    can(READ, UPDATE, [TASK], {user_id: user.id});

    can([MANAGE], [TASK_TIME_TRACKING], {user_id: user.id});

    can([MANAGE], [USERS], {id: user.id});
    can([MANAGE], [PROJECT, TASK], {created_by_user_id: user.id});

    can(READ, [PROJECT_USERS], {user_id: user.id});

    const myTasksIds = (await getMyTasks({context, user_id: user.id})).map(
      (it) => it.id,
    );

    can(MANAGE, [TASK_FILES], {task_id: {$in: myTasksIds}});
  }

  const companiesUsers = await getCompanies({context, user_id: user.id});

  for (const companyUser of companiesUsers) {
    if (companyUser.role === 'admin') {
      //cosas que puede hacer el owner
      can(
        [MANAGE],
        [
          COMPANY_USERS,
          COMPANY_USERS_WISH_LIST,
          PROJECT_USERS,
          PROJECT,
          REQUEST_MEMBERS,
          STAND_UP,
          SUPPORT_TICKETS,
          TASK,
          COMPANY_ONBOARDINGS,
        ],
        {
          company_id: companyUser.company_id,
        },
      );

      can(READ, [USERS], {talent_pool_visibility: 'visible'});

      const onboardingsIds = (
        await getCompanyOnboardings({
          context,
          company_id: companyUser.company_id,
        })
      ).map((it) => it.id);

      const requestMembersIds = (
        await getRequestMembers({
          context,
          company_id: companyUser.company_id,
        })
      ).map((it) => it.id);

      can(
        MANAGE,
        ['company-onboardings-meetings', 'company-onboarding-files'],
        {
          company_onboarding_id: {$in: onboardingsIds},
        },
      );

      can(MANAGE, ['requests-members-skills'], {
        request_member_id: {$in: requestMembersIds},
      });
    }

    if (companyUser.role === 'employee') {
      can(MANAGE, [PROJECT_USERS, PROJECT, STAND_UP, TASK], {
        company_id: companyUser.company_id,
      });

      can(MANAGE, [STAND_UP], {
        user_id: user.id,
      });

      can(READ, [COMPANY_ONBOARDINGS], {
        company_id: companyUser.company_id,
      });
    }
  }

  // if (process.env.NODE_ENV !== 'production') {
  //   // can('create', ['users']);
  // }

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
