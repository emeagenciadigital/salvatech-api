// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const {Model} = require('objection');

class ProjectUsers extends Model {
  static get tableName() {
    return 'project_users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'company_id', 'project_id'],

      properties: {
        user_id: {type: 'integer'},
        company_id: {type: 'integer'},
        project_id: {type: 'integer'},
      },
    };
  }

  $beforeInsert() {
    this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = function (app) {
  const db = app.get('knex');

  db.schema
    .hasTable('project_users')
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable('project_users', (table) => {
            table.increments('id');
            table
              .integer('user_id')
              .unsigned()
              .references('id')
              .inTable('users')
              .index();
            table
              .integer('company_id')
              .unsigned()
              .references('id')
              .inTable('companies')
              .index();
            table
              .integer('project_id')
              .unsigned()
              .references('id')
              .inTable('projects')
              .index();
            // table.integer('company_user_role_id');
            table.timestamp('deletedAt').nullable();
            table.timestamp('createdAt');
            table.timestamp('updatedAt');
          })
          .then(() => console.log('Created project_users table')) // eslint-disable-line no-console
          .catch((e) => console.error('Error creating project_users table', e)); // eslint-disable-line no-console
      }
    })
    .catch((e) => console.error('Error creating project_users table', e)); // eslint-disable-line no-console

  return ProjectUsers;
};
