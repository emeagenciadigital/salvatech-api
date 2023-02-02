// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const {Model} = require('objection');

class Tasks extends Model {
  static get tableName() {
    return 'tasks';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['project_id'],

      properties: {
        title: {type: 'string'},
        created_by_user_id: {type: 'integer'},
        company_id: {type: 'integer'},
        user_id: {type: 'integer'},
        description: {type: 'string'},
        total_time_in_seconds: {type: 'integer'},
        status: {type: 'string', enum: ['completed', 'pending', 'in_progress']},
        priority: {type: 'integer'},
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
    .hasTable('tasks')
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable('tasks', (table) => {
            table.increments('id');
            table.string('title');
            table
              .integer('created_by_user_id')
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
              .integer('user_id')
              .unsigned()
              .references('id')
              .inTable('users')
              .index();
            table.dateTime('date_start');
            table.text('description', 'longText');
            table.integer('total_time_in_seconds');
            table
              .enum('status', ['completed', 'pending', 'in_progress'])
              .defaultTo('pending');
            table.integer('priority');
            table
              .integer('project_id')
              .unsigned()
              .references('id')
              .inTable('projects')
              .index();
            table.dateTime('date_task_pending_date');
            table.dateTime('date_task_completed_date');
            table.dateTime('date_task_in_progress_date');
            table.timestamp('deletedAt').nullable();
            table.timestamp('createdAt');
            table.timestamp('updatedAt');
          })
          .then(() => console.log('Created tasks table')) // eslint-disable-line no-console
          .catch((e) => console.error('Error creating tasks table', e)); // eslint-disable-line no-console
      }
    })
    .catch((e) => console.error('Error creating tasks table', e)); // eslint-disable-line no-console

  return Tasks;
};
