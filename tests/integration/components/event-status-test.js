import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | event-status', function(hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function() {
    this.set('event', EmberObject.create({
      isReady: true,
      isNext: true,
      isNow: true,
      hasEnded: true
    }));
  });
  test('it renders isReady', async function(assert) {
    await render(hbs`{{event-status event=event}}`);
    assert.equal(this.element.textContent.trim(), 'Starting Soon');
    assert.ok(this.element.querySelector('.blue'));
  });
  test('it renders isNext', async function(assert) {
    this.get('event').setProperties({
      isReady: false
    });
    await render(hbs`{{event-status event=event}}`);
    assert.equal(this.element.textContent.trim(), 'Up Next');
    assert.ok(this.element.querySelector('.blue'));
  });
  test('it renders isNow', async function(assert) {
    this.get('event').setProperties({
      isReady: false,
      isNext: false
    });
    await render(hbs`{{event-status event=event}}`);
    assert.equal(this.element.textContent.trim(), 'Now');
    assert.ok(this.element.querySelector('.green'));
  });
  test('it renders hasEnded', async function(assert) {
    this.get('event').setProperties({
      isReady: false,
      isNext: false,
      isNow: false
    });
    await render(hbs`{{event-status event=event}}`);
    assert.equal(this.element.textContent.trim(), 'Completed');
    assert.notOk(this.element.querySelector('.blue'));
    assert.notOk(this.element.querySelector('.green'));
  });
  test('it renders later', async function(assert) {
    this.get('event').setProperties({
      isReady: false,
      isNext: false,
      isNow: false,
      hasEnded: false
    });
    await render(hbs`{{event-status event=event}}`);
    assert.equal(this.element.textContent.trim(), 'Starting Later');
    assert.notOk(this.element.querySelector('.blue'));
    assert.notOk(this.element.querySelector('.green'));
  });
});
