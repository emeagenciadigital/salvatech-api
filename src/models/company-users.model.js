// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const {Model} = require('objection');

class CompanyUsers extends Model {
  static get tableName() {
    return 'company_users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['company_id'],

      properties: {
        company_id: {type: 'integer'},
        user_id: {type: 'integer'},
        role: {type: 'string', enum: ['admin', 'employee']},
        hired_status: {type: 'string', enum: ['active', 'completed']},
        contact_email: {type: 'string'},
        contact_phone: {type: 'string'},
        role_name: {type: 'string'},
        deparment_name: {type: 'string'},
        owner: {type: 'string', enum: ['true', 'false']},
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
    .hasTable('company_users')
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable(tableName, (table) => {
            table.increments('id');
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
            table.enum('role', ['admin', 'employee']);
            table
              .enum('hired_status', ['active', 'completed'])
              .defaultTo('active');
            table.dateTime('date_start');
            table.dateTime('date_end').nullable();
            table.string('contact_email');
            table.string('contact_phone');
            table.string('role_name');
            table.string('department_name');
            table.enum('owner', ['true', 'false']).defaultTo('false');
            table.timestamp('deletedAt').nullable();
            table.timestamp('createdAt');
            table.timestamp('updatedAt');
          })
          .then(() => console.log(`Created ${tableName} table`))
          .catch((e) => console.error(`Error creating ${tableName} table`, e));
      }
    })
    .catch((e) => console.error('Error creating company_users table', e)); // eslint-disable-line no-console

  return CompanyUsers;
};
