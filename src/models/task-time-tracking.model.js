// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const {Model} = require('objection');

class TaskTimeTracking extends Model {
  static get tableName() {
    return 'task_time_tracking';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['task_id', 'project_id', 'user_id'],

      properties: {
        task_id: {type: 'integer'},
        project_id: {type: 'integer'},
        user_id: {type: 'integer'},
        seconds: {type: 'integer'},
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
    .hasTable('task_time_tracking')
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable('task_time_tracking', (table) => {
            table.increments('id');
            table
              .integer('task_id')
              .unsigned()
              .references('id')
              .inTable('tasks')
              .index();
            table
              .integer('project_id')
              .unsigned()
              .references('id')
              .inTable('projects')
              .index();
            table
              .integer('user_id')
              .unsigned()
              .references('id')
              .inTable('users')
              .index();
            table.integer('seconds');
            table.timestamp('deletedAt').nullable();
            table.timestamp('createdAt');
            table.timestamp('updatedAt');
          })
          .then(() => console.log('Created task_time_tracking table')) // eslint-disable-line no-console
          .catch((e) =>
            console.error('Error creating task_time_tracking table', e),
          ); // eslint-disable-line no-console
      }
    })
    .catch((e) => console.error('Error creating task_time_tracking table', e)); // eslint-disable-line no-console

  return TaskTimeTracking;
};
