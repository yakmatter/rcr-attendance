import EmberObject from '@ember/object';
import EventMixin from 'rcr-attendance/mixins/event';
import { module, test } from 'qunit';

module('Unit | Mixin | event', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let EventObject = EmberObject.extend(EventMixin);
    let subject = EventObject.create();
    assert.ok(subject);
  });
});
