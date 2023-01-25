/* eslint-disable no-console */

// users-model.js - A KnexJS
// 
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'users';
  
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
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
        table.text('path_video','longText');
        table.string('location_city');
        table.string('location_country');
        table.enum('main_role',['admin','user']).defaultTo("user");
        table.integer('years_of_experience');
        table.enum('level_of_seniority',['junior','mid_level','senior']).nullable()
        table.integer('profession_id').nullable()
        table.string('profession_name');
        table.dateTime('last_activity_date');
        table.text('about_me','longText');
        table.text('website_url','longText');
        table.enum('talent_pool_visibility',['visible','hidden']).defaultTo("visible");
        table.enum('talent_vetted_status',['vetted','not_vetted']).defaultTo('not_vetted');
        table.enum('talent_pool_application_status',['completed','in_progress','in_review','rejected','accepted']);
        table.string('email').unique();
        table.timestamp('deletedAt').nullable()
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });

  return db;
};
