// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const {Model} = require('objection');

class CompanyOnboardings extends Model {
  static get tableName() {
    return 'company_onboardings';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['company_id'],

      properties: {
        company_id: {type: 'integer'},
        // date_start: {type: 'string', format: 'date'},
        // date_end: {type: 'string', format: 'date-time'},
        status: {
          type: 'string',
          enum: [
            'completed',
            'in_progress',
            'in_review',
            'canceled',
            'rejected',
          ],
        },
        rejected_reason: {type: ['string', 'null']},
        current_step: {type: 'integer'},
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
    .hasTable('company_onboardings')
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable('company_onboardings', (table) => {
            table.increments('id');
            table
              .integer('company_id')
              .unsigned()
              .references('id')
              .inTable('companies')
              .index();
            table.dateTime('date_start');
            table.dateTime('date_end');
            table
              .enum('status', [
                'completed',
                'in_progress',
                'in_review',
                'canceled',
                'rejected',
              ])
              .nullable();
            table.text('rejected_reason');
            table.integer('current_step');
            table.timestamp('deletedAt').nullable();
            table.timestamp('createdAt');
            table.timestamp('updatedAt');
          })
          .then(() => console.log('Created company_onboardings table')) // eslint-disable-line no-console
          .catch((e) =>
            console.error('Error creating company_onboardings table', e),
          ); // eslint-disable-line no-console
      }
    })
    .catch((e) => console.error('Error creating company_onboardings table', e)); // eslint-disable-line no-console

  return CompanyOnboardings;
};
