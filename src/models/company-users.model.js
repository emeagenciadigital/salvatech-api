/* eslint-disable no-console */

// company users-model.js - A KnexJS
// 
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'company_users';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.integer('company_id')
          .unsigned()
          .references('id')
          .inTable('companies')
          .index();
        table.integer('user_id')
          .unsigned()
          .references('id')
          .inTable('users')
          .index();
        table.enum('role',['admin','employee']);
        table.enum('hired_status',['active','completed']).defaultTo('active');
        table.dateTime('date_start');
        table.dateTime('date_end').nullable();
        table.string('contact_email');
        table.string('contact_phone');
        table.string('role_name');
        table.string('department_name');
        table.enum('owner',['true','false']).defaultTo('false');
        table.timestamp("deletedAt").nullable();
        table.timestamp("createdAt");
        table.timestamp("updatedAt");
        })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });
  

  return db;
};
