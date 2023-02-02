const assert = require('assert');
const app = require('../../src/app');

describe('\'request_member_skills\' service', () => {
  it('registered the service', () => {
    const service = app.service('request-member-skills');

    assert.ok(service, 'Registered the service');
  });
});
