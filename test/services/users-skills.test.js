const assert = require('assert');
const app = require('../../src/app');

describe('\'users skills\' service', () => {
  it('registered the service', () => {
    const service = app.service('users-skills');

    assert.ok(service, 'Registered the service');
  });
});
