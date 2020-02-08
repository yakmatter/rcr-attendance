import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | home/programs/program/teams/team/events/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:home/programs/program/teams/team/events/index');
    assert.ok(route);
  });
});
