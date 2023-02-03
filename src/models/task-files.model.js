// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const {Model} = require('objection');

class TaskFiles extends Model {
  static get tableName() {
    return 'task_files';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['task_id'],

      properties: {
        task_id: {type: 'integer'},
        name: {type: ['string', 'null']},
        path: {type: 'string'},
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
    .hasTable('task_files')
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable('task_files', (table) => {
            table.increments('id');
            table
              .integer('task_id')
              .unsigned()
              .references('id')
              .inTable('tasks')
              .index();
            table.string('name');
            table.text('path', 'longText');
            table.timestamp('deletedAt').nullable();
            table.timestamp('createdAt');
            table.timestamp('updatedAt');
          })
          .then(() => console.log('Created task_files table')) // eslint-disable-line no-console
          .catch((e) => console.error('Error creating task_files table', e)); // eslint-disable-line no-console
      }
    })
    .catch((e) => console.error('Error creating task_files table', e)); // eslint-disable-line no-console

  return TaskFiles;
};
