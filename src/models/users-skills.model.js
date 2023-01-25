/* eslint-disable no-console */

// users skills-model.js - A KnexJS
// 
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'users_skills';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.integer('user_id')
          .unsigned()
          .references('id')
          .inTable('users')
          .index();
        table.integer('skill_id')
          .unsigned()
          .references('id')
          .inTable('skills')
          .index();
        table.string('skill_name');
        table.integer('level');
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
