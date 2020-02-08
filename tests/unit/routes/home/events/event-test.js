import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | home/events/event', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:home/events/event');
    assert.ok(route);
  });
});
