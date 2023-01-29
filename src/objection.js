const {Model} = require('objection');
const knex = require('knex');

module.exports = function (app) {
  const {client, connection} = app.get('mysql');
  const db = knex({client, connection, useNullAsDefault: true});

  db.on('query', (db) => {
    console.log(db.sql);
  });
  Model.knex(db);

  console.log(db);

  app.set('knex', db);
};
