const assert = require('assert');
const app = require('../../src/app');

describe('\'companies users\' service', () => {
  it('registered the service', () => {
    const service = app.service('companies-users');

    assert.ok(service, 'Registered the service');
  });
});
