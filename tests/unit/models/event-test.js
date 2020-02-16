import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import moment from 'moment';
import Service from '@ember/service';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

module('Unit | Model | event', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    const store = this.owner.lookup('service:store');
    const TickService = Service.extend({
      tick: null,
      init() {
        this._super(...arguments);
        this.updateTick();
      },
      updateTick() {
        this.set('tick', moment());
      }
    });
    this.owner.register('service:tick', TickService);

    const event = store.createRecord('event');
    event.set('startTime', moment('2019-10-01 10:00:00', DATE_TIME_FORMAT));
    event.set('endTime', moment('2019-10-01 11:00:00', DATE_TIME_FORMAT));
    this.set('event', event);
  });

  test('it exists', function(assert) {
    assert.ok(this.get('event'));
  });

  test('it isNow', function(assert) {
    this.set('event.tick.tick', moment('2019-10-01 10:10:00', DATE_TIME_FORMAT));
    assert.ok(this.get('event.isNow'));
  });

  test('it hasStarted', function(assert) {
    this.set('event.tick.tick', moment('2019-10-01 10:10:00', DATE_TIME_FORMAT));
    assert.ok(this.get('event.hasStarted'));
  });

  test('it hasEnded', function(assert) {
    this.set('event.tick.tick', moment('2019-10-01 11:10:00', DATE_TIME_FORMAT));
    assert.ok(this.get('event.hasEnded'));
  });

  test('it isReady', function(assert) {
    this.set('event.tick.tick', moment('2019-10-01 09:50:00', DATE_TIME_FORMAT));
    assert.ok(this.get('event.isReady'));
  });

  test('it isNext', function(assert) {
    this.set('event.tick.tick', moment('2019-10-01 09:10:00', DATE_TIME_FORMAT));
    assert.ok(this.get('event.isNext'));
  });

  test('it isToday, earler', function(assert) {
    this.set('event.tick.tick', moment('2019-10-01 00:10:00', DATE_TIME_FORMAT));
    assert.ok(this.get('event.isToday'));
  });

  test('it isToday, later', function(assert) {
    this.set('event.tick.tick', moment('2019-10-01 23:10:00', DATE_TIME_FORMAT));
    assert.ok(this.get('event.isToday'));
  });

  test('it isPractice', function(assert) {
    this.set('event.type', 'practice');
    assert.ok(this.get('event.isPractice'));
  });

  test('it isScrimmage', function(assert) {
    this.set('event.type', 'scrimmage');
    assert.ok(this.get('event.isScrimmage'));
  });
});
