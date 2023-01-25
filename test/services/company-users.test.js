const assert = require('assert');
const app = require('../../src/app');

describe('\'company users\' service', () => {
  it('registered the service', () => {
    const service = app.service('company-users');

    assert.ok(service, 'Registered the service');
  });
});
