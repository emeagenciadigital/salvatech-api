const { Service } = require('feathers-knex');

exports.StandUp = class StandUp extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'stand_up'
    });
  }
};
