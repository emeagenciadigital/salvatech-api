// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const {Model} = require('objection');

class Feedback extends Model {
  static get tableName() {
    return 'feedback';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'from_user_avatar_path',
        'from_user_id',
        'to_user_id',
        'feedback_hash',
      ],

      properties: {
        from_user_avatar_path: {type: 'text'},
        to_user_avatar_path: {type: 'text'},
        from_user_id: {type: 'integer'},
        to_user_id: {type: 'integer'},
        feedback_hash: {type: 'string'},
        message: {type: 'text'},
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
    .hasTable('feedback')
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable('feedback', (table) => {
            table.increments('id');
            table
              .integer('from_user_id')
              .unsigned()
              .references('id')
              .inTable('users')
              .index();
            table
              .integer('to_user_id')
              .unsigned()
              .references('id')
              .inTable('users')
              .index();
            table.string('feedback_hash');
            table.text('from_user_avatar_path', 'mediumText');
            table.text('to_user_avatar_path', 'mediumText');
            table.text('meta_from_full_name');
            table.text('meta_to_full_name');
            table.text('message', 'longText');
            table.timestamp('deletedAt').nullable();
            table.timestamp('createdAt');
            table.timestamp('updatedAt');
          })
          .then(() => console.log('Created feedback table')) // eslint-disable-line no-console
          .catch((e) => console.error('Error creating feedback table', e)); // eslint-disable-line no-console
      }
    })
    .catch((e) => console.error('Error creating feedback table', e)); // eslint-disable-line no-console

  return Feedback;
};
