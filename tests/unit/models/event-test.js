import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import moment from 'moment';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const MODEL = {
  startTime: moment('2019-10-01 10:00:00', DATE_TIME_FORMAT).toDate(),
  endTime: moment('2019-10-01 11:00:00', DATE_TIME_FORMAT).toDate()
};

module('Unit | Model | event', function(hooks) {
  setupTest(hooks);
  hooks.beforeEach(function() {
    this.set('startTime', moment('2019-10-01 10:00:00', DATE_TIME_FORMAT));
    this.set('endTime', moment('2019-10-01 11:00:00', DATE_TIME_FORMAT));
  });

  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('event', {});
    assert.ok(model);
  });

  test('it isNow', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('event', Object.assign(MODEL, {
      now: () => moment('2019-10-01 10:10:00', DATE_TIME_FORMAT)
    }));
    assert.ok(model.get('isNow'));
  });

  test('it hasStarted', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('event', Object.assign(MODEL, {
      now: () => moment('2019-10-01 10:10:00', DATE_TIME_FORMAT)
    }));
    assert.ok(model.get('hasStarted'));
  });

  test('it hasEnded', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('event', Object.assign(MODEL, {
      now: () => moment('2019-10-01 11:10:00', DATE_TIME_FORMAT)
    }));
    assert.ok(model.get('hasStarted'));
  });

  test('it isReady', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('event', Object.assign(MODEL, {
      now: () => moment('2019-10-01 09:50:00', DATE_TIME_FORMAT)
    }));
    assert.ok(model.get('isReady'));
  });

  test('it isNext', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('event', Object.assign(MODEL, {
      now: () => moment('2019-10-01 09:10:00', DATE_TIME_FORMAT)
    }));
    assert.ok(model.get('isNext'));
  });

  test('it isToday, earler', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('event', Object.assign(MODEL, {
      now: () => moment('2019-10-01 00:10:00', DATE_TIME_FORMAT)
    }));
    assert.ok(model.get('isToday'));
  });

  test('it isToday, later', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('event', Object.assign(MODEL, {
      now: () => moment('2019-10-01 23:10:00', DATE_TIME_FORMAT)
    }));
    assert.ok(model.get('isToday'));
  });

  test('it isPractice', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('event', Object.assign(MODEL, {
      type: 'practice'
    }));
    assert.ok(model.get('isPractice'));
  });

  test('it isScrimmage', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('event', Object.assign(MODEL, {
      type: 'scrimmage'
    }));
    assert.ok(model.get('isScrimmage'));
  });
});
