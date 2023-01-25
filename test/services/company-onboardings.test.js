const assert = require('assert');
const app = require('../../src/app');

describe('\'company onboardings\' service', () => {
  it('registered the service', () => {
    const service = app.service('company-onboardings');

    assert.ok(service, 'Registered the service');
  });
});
