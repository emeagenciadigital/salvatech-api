const assert = require('assert');
const app = require('../../src/app');

describe('\'stand up\' service', () => {
  it('registered the service', () => {
    const service = app.service('stand-up');

    assert.ok(service, 'Registered the service');
  });
});
