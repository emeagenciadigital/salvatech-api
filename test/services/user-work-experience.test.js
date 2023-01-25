const assert = require('assert');
const app = require('../../src/app');

describe('\'user work experience\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-work-experience');

    assert.ok(service, 'Registered the service');
  });
});
