const assert = require('assert');
const app = require('../../src/app');

describe('\'company onboarding meetings\' service', () => {
  it('registered the service', () => {
    const service = app.service('company-onboarding-meetings');

    assert.ok(service, 'Registered the service');
  });
});
