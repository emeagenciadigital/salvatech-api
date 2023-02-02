// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const {Model} = require('objection');

class RequestMemberSkills extends Model {
  static get tableName() {
    return 'request_member_skills';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['request_members_id', 'skill_id'],

      properties: {
        request_members_id: {type: 'integer'},
        skill_id: {type: 'integer'},
        skill_name: {type: ['string', 'null']},
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
    .hasTable('request_member_skills')
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable('request_member_skills', (table) => {
            table.increments('id');
            table
              .integer('request_members_id')
              .unsigned()
              .references('id')
              .inTable('request_members')
              .index();
            table
              .integer('skill_id')
              .unsigned()
              .references('id')
              .inTable('skills')
              .index();
            table.string('skill_name');
            table.timestamp('deletedAt').nullable();
            table.timestamp('createdAt');
            table.timestamp('updatedAt');
          })
          .then(() => console.log('Created request_member_skills table')) // eslint-disable-line no-console
          .catch((e) =>
            console.error('Error creating request_member_skills table', e),
          ); // eslint-disable-line no-console
      }
    })
    .catch((e) =>
      console.error('Error creating request_member_skills table', e),
    ); // eslint-disable-line no-console

  return RequestMemberSkills;
};
