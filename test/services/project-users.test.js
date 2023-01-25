const assert = require('assert');
const app = require('../../src/app');

describe('\'project users\' service', () => {
  it('registered the service', () => {
    const service = app.service('project-users');

    assert.ok(service, 'Registered the service');
  });
});
