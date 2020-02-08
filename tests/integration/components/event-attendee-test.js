import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | event-attendee', function(hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function() {
    this.set('attendance', EmberObject.create({
      skater: EmberObject.create({
        displayName: 'roland fallwell',
        team: EmberObject.create({
          logo: './assets/images/voodoo-dolls.png',
          className: 'voodoo-dolls'
        })
      }),
      attended: true,
      event: EmberObject.create({
        isToday: true
      })
    }));

  });

  test('it renders attended current event', async function(assert) {
    await render(hbs`{{event-attendee attendance=attendance}}`);

    assert.ok(this.element.querySelector('.event-attendee-team').className.includes(this.get('attendance.skater.team.className')));
    assert.equal(this.element.querySelector('.event-attendee-team img').getAttribute('src'), this.get('attendance.skater.team.logo'));
    assert.equal(this.element.querySelector('.event-attendee-skater-name').textContent.trim(), this.get('attendance.skater.displayName'));
    assert.equal(this.element.querySelector('.event-attendee-attended').textContent.trim(), 'Checked In');
    assert.ok(this.element.querySelector('.event-attendee-attended .checkbox.checked'));
    assert.ok(this.element.querySelector('.event-attendee'));
  });

  test('it renders not attended current event', async function(assert) {
    this.set('attendance.attended', false);
    await render(hbs`{{event-attendee attendance=attendance}}`);

    assert.ok(this.element.querySelector('.event-attendee-team').className.includes(this.get('attendance.skater.team.className')));
    assert.equal(this.element.querySelector('.event-attendee-team img').getAttribute('src'), this.get('attendance.skater.team.logo'));
    assert.equal(this.element.querySelector('.event-attendee-skater-name').textContent.trim(), this.get('attendance.skater.displayName'));
    assert.equal(this.element.querySelector('.event-attendee-attended').textContent.trim(), 'Checked In');
    assert.notOk(this.element.querySelector('.event-attendee-attended .checkbox.checked'));
    assert.ok(this.element.querySelector('.event-attendee'));
  });

  test('it renders attended past event', async function(assert) {
    this.get('attendance.event').setProperties({
      isToday: false,
      hasEnded: true
    });
    await render(hbs`{{event-attendee attendance=attendance}}`);

    assert.ok(this.element.querySelector('.event-attendee-team').className.includes(this.get('attendance.skater.team.className')));
    assert.equal(this.element.querySelector('.event-attendee-team img').getAttribute('src'), this.get('attendance.skater.team.logo'));
    assert.equal(this.element.querySelector('.event-attendee-skater-name').textContent.trim(), this.get('attendance.skater.displayName'));
    assert.equal(this.element.querySelector('.event-attendee-attended').textContent.trim(), 'Attended');
    assert.ok(this.element.querySelector('.event-attendee'));
  });

  test('it renders not attended past event', async function(assert) {
    this.get('attendance.event').setProperties({
      isToday: false,
      hasEnded: true
    });
    this.set('attendance.attended', false);
    await render(hbs`{{event-attendee attendance=attendance}}`);

    assert.ok(this.element.querySelector('.event-attendee-team').className.includes(this.get('attendance.skater.team.className')));
    assert.equal(this.element.querySelector('.event-attendee-team img').getAttribute('src'), this.get('attendance.skater.team.logo'));
    assert.equal(this.element.querySelector('.event-attendee-skater-name').textContent.trim(), this.get('attendance.skater.displayName'));
    assert.equal(this.element.querySelector('.event-attendee-attended').textContent.trim(), 'Did not attend');
    assert.ok(this.element.querySelector('.event-attendee'));
  });

  test('it renders attended future event', async function(assert) {
    this.get('attendance.event').setProperties({
      isToday: false,
      hasEnded: false
    });
    await render(hbs`{{event-attendee attendance=attendance}}`);

    assert.ok(this.element.querySelector('.event-attendee-team').className.includes(this.get('attendance.skater.team.className')));
    assert.equal(this.element.querySelector('.event-attendee-team img').getAttribute('src'), this.get('attendance.skater.team.logo'));
    assert.equal(this.element.querySelector('.event-attendee-skater-name').textContent.trim(), this.get('attendance.skater.displayName'));
    assert.equal(this.element.querySelector('.event-attendee-attended').textContent.trim(), '...');
    assert.ok(this.element.querySelector('.event-attendee'));
  });

  test('it renders not attended future event', async function(assert) {
    this.get('attendance.event').setProperties({
      isToday: false,
      hasEnded: false
    });
    this.set('attendance.attended', false);
    await render(hbs`{{event-attendee attendance=attendance}}`);

    assert.ok(this.element.querySelector('.event-attendee-team').className.includes(this.get('attendance.skater.team.className')));
    assert.equal(this.element.querySelector('.event-attendee-team img').getAttribute('src'), this.get('attendance.skater.team.logo'));
    assert.equal(this.element.querySelector('.event-attendee-skater-name').textContent.trim(), this.get('attendance.skater.displayName'));
    assert.equal(this.element.querySelector('.event-attendee-attended').textContent.trim(), '...');
    assert.ok(this.element.querySelector('.event-attendee'));
  });
});
