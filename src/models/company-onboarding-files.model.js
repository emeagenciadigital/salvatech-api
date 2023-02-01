// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const {Model} = require('objection');

class CompanyOnboardingFiles extends Model {
  static get tableName() {
    return 'company_onboarding_files';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['company_onboarding_id'],

      properties: {
        company_onboarding_id: {type: 'integer'},
        name: {type: ['string', 'null']},
        download_path: {type: ['string', 'null']},
        uploaded_path: {type: ['string', 'null']},
        status: {
          type: 'string',
          enum: ['waiting', 'in_review', 'accepted', 'rejected'],
        },
        rejected_reason: {type: ['string', 'null']},
        requires_upload: {type: 'string', enum: ['true', 'false']},
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
    .hasTable('company_onboarding_files')
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable('company_onboarding_files', (table) => {
            table.increments('id');
            table
              .integer('company_onboarding_id')
              .unsigned()
              .references('id')
              .inTable('company_onboardings')
              .index();
            table.string('name');
            table.text('download_path', 'longText');
            table.text('uploaded_path', 'longText');
            table
              .enum('status', ['waiting', 'in_review', 'accepted', 'rejected'])
              .defaultTo('waiting');
            table.string('rejected_reason');
            table.enum('requires_upload', ['true', 'false']);
            table.text('description');
            table.timestamp('deletedAt').nullable();
            table.timestamp('createdAt');
            table.timestamp('updatedAt');
          })
          .then(() => console.log('Created company_onboarding_files table')) // eslint-disable-line no-console
          .catch((e) =>
            console.error('Error creating company_onboarding_files table', e),
          ); // eslint-disable-line no-console
      }
    })
    .catch((e) =>
      console.error('Error creating company_onboarding_files table', e),
    ); // eslint-disable-line no-console

  return CompanyOnboardingFiles;
};
