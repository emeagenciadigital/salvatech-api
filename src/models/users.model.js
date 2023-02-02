// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const {Model} = require('objection');

class Users extends Model {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['first_name', 'last_name'],

      properties: {
        first_name: {type: 'string'},
        last_name: {type: 'string'},
        email: {type: 'string'},
        phone_country_code: {type: 'string'},
        phone: {type: 'string'},
        email_verified: {type: 'string'},
        phone_verified: {type: 'string'},
        otp_email_token: {type: 'string'},
        otp_phone_token: {type: 'string'},
        location_city: {type: 'string'},
        location_country: {type: 'string'},
        main_role: {type: 'string', enum: ['admin', 'user']},
        years_of_experience: {type: 'integer'},
        level_of_seniority: {
          type: 'string',
          enum: ['junior', 'mid_level', 'senior'],
        },
        profession_id: {type: 'integer'},
        profession_name: {type: 'string'},
        last_activity_date: {type: 'string'},
        about_me: {type: 'string'},
        website_url: {type: 'string'},
        path_avatar: {type: ['string', 'null']},
        talent_pool_visibility: {type: 'string', enum: ['visible', 'hidden']},
        talent_vetted_status: {type: 'string', enum: ['vetted', 'not_vetted']},
        talent_pool_application_status: {
          type: ['string', 'null'],
          enum: [
            'completed',
            'in_progress',
            'in_review',
            'rejected',
            'accepted',
            null,
          ],
        },
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
    .hasTable('users')
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable('users', (table) => {
            table.increments('id');
            table.string('first_name').nullable();
            table.string('last_name').nullable();
            table.string('phone_country_code');
            table.string('phone');
            table.string('password');
            table.string('email_verified');
            table.string('phone_verified');
            table.string('otp_email_token');
            table.string('otp_phone_token');
            table.text('path_avatar');
            table.text('path_video', 'longText');
            table.string('location_city');
            table.string('location_country');
            table.enum('main_role', ['admin', 'user']).defaultTo('user');
            table.integer('years_of_experience');
            table
              .enum('level_of_seniority', ['junior', 'mid_level', 'senior'])
              .nullable();
            table.integer('profession_id').nullable();
            table.string('profession_name');
            table.dateTime('last_activity_date');
            table.text('about_me', 'longText');
            table.text('website_url', 'longText');
            table
              .enum('talent_pool_visibility', ['visible', 'hidden'])
              .defaultTo('visible');
            table
              .enum('talent_vetted_status', ['vetted', 'not_vetted'])
              .defaultTo('not_vetted');
            table.enum('talent_pool_application_status', [
              'completed',
              'in_progress',
              'in_review',
              'rejected',
              'accepted',
            ]);
            table.string('email').unique();
            table.timestamp('deletedAt').nullable();
            table.timestamp('createdAt');
            table.timestamp('updatedAt');
          })
          .then(() => console.log('Created users table')) // eslint-disable-line no-console
          .catch((e) => console.error('Error creating users table', e)); // eslint-disable-line no-console
      }
    })
    .catch((e) => console.error('Error creating users table', e)); // eslint-disable-line no-console

  return Users;
};
