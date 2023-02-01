// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const {Model} = require('objection');

class CompanyOnboardingMeetings extends Model {
  static get tableName() {
    return 'company_onboarding_meetings';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['company_onboarding_id'],

      properties: {
        company_onboarding_id: {type: 'integer'},
        name: {type: ['string', 'null']},
        link: {type: ['string', 'null']},
        status: {type: 'string', enum: ['completed', 'scheduled', 'canceled']},
        description: {type: ['string', 'null']},
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
    .hasTable('company_onboarding_meetings')
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable('company_onboarding_meetings', (table) => {
            table.increments('id');
            table
              .integer('company_onboarding_id')
              .unsigned()
              .references('id')
              .inTable('company_onboardings')
              .index();
            table.string('name');
            table.dateTime('date');
            table.text('link', 'longText');
            table
              .enum('status', ['completed', 'scheduled', 'canceled'])
              .defaultTo('scheduled');
            table.text('description', 'longText');
            table.timestamp('deletedAt').nullable();
            table.timestamp('createdAt');
            table.timestamp('updatedAt');
          })
          .then(() => console.log('Created company_onboarding_meetings table')) // eslint-disable-line no-console
          .catch((e) =>
            console.error(
              'Error creating company_onboarding_meetings table',
              e,
            ),
          ); // eslint-disable-line no-console
      }
    })
    .catch((e) =>
      console.error('Error creating company_onboarding_meetings table', e),
    ); // eslint-disable-line no-console

  return CompanyOnboardingMeetings;
};
