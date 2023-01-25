const { Service } = require('feathers-knex');

exports.CompanyUsersWishList = class CompanyUsersWishList extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'company_users_wish_list'
    });
  }
};
