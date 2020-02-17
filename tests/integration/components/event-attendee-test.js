import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

const SKATER = () => {
  return EmberObject.create({
    displayName: 'roland fallwell',
    team: EmberObject.create({
      logo: './assets/images/voodoo-dolls.png',
      className: 'voodoo-dolls'
    })
  });
};

const ATTENDANCE = (addSkater = false, attended = false, isToday = true, name = 'event 1') => {
  return EmberObject.create({
    attended,
    name,
    event: EmberObject.create({
      isToday,
      name
    }),
    shouldShowRelatedEvents: false,
    skater: addSkater ? SKATER() : null
  });
};

module('Integration | Component | event-attendee', function(hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function() {
    let attendance = ATTENDANCE(true);
    attendance.set('relatedAttendances', [ attendance ]);
    this.set('attendance', attendance);
    this.set('showRelatedEvents', function() {
      this.get('attendance').toggleProperty('shouldShowRelatedEvents');
    });
  });

  test('it renders not attended current event', async function(assert) {
    await render(hbs`
      {{event-attendee attendance=attendance showRelatedEvents=showRelatedEvents}}
    `);

    assert.dom('.event-attendee').exists();
    assert.dom('.event-attendee-team').hasClass(this.get('attendance.skater.team.className'));
    assert.dom('.event-attendee-team img').hasAttribute('src', this.get('attendance.skater.team.logo'));
    assert.dom('.event-attendee-skater-name').hasText(this.get('attendance.skater.displayName'));
    assert.dom('.event-attendee-attended .checkin-button').hasText('Check In');

    await click('.checkin-button');
    assert.dom('.event-attendee-attendances-row-0 .event-attendee-event-name').hasText('event 1');
    assert.dom('.event-attendee-attendances-row-0 .is-present-checkbox input').isNotChecked();

    assert.dom('.event-attendee-attendances-row-0 .off-skates-checkbox input').isDisabled();

    await click('.event-attendee-attendances-row-0 .is-present-checkbox');
    assert.dom('.event-attendee-attendances-row-0 .is-present-checkbox input').isChecked();
    assert.dom('.event-attendee-attended .checkin-button').hasText('Checked In');

    assert.dom('.event-attendee-attendances-row-0 .off-skates-checkbox input').isNotChecked();
  });

  test('it renders attended current event', async function(assert) {
    this.set('attendance.attended', true);
    // this.set('attendance.relatedAttendances.firstObject.attended', true);
    await render(hbs`{{event-attendee attendance=attendance showRelatedEvents=showRelatedEvents}}`);

    assert.dom('.event-attendee').exists();
    assert.dom('.event-attendee-team').hasClass(this.get('attendance.skater.team.className'));
    assert.dom('.event-attendee-team img').hasAttribute('src', this.get('attendance.skater.team.logo'));
    assert.dom('.event-attendee-skater-name').hasText(this.get('attendance.skater.displayName'));
    assert.dom('.event-attendee-attended .checkin-button').hasText('Checked In');

    await click('.checkin-button');
    assert.dom('.event-attendee-attendances-row-0 .event-attendee-event-name').hasText('event 1');
    assert.dom('.event-attendee-attendances-row-0 .is-present-checkbox input').isChecked();

    assert.dom('.event-attendee-attendances-row-0 .off-skates-checkbox input').isNotChecked();
    await click('.event-attendee-attendances-row-0 .off-skates-checkbox');
    assert.dom('.event-attendee-attendances-row-0 .off-skates-checkbox input').isChecked();

    await click('.event-attendee-attendances-row-0 .is-present-checkbox');
    assert.dom('.event-attendee-attendances-row-0 .is-present-checkbox input').isNotChecked();
    assert.dom('.event-attendee-attended .checkin-button').hasText('Check In');

    assert.dom('.event-attendee-attendances-row-0 .off-skates-checkbox input').isDisabled();
  });



  test('it renders "checked in" if any related event is attended', async function(assert) {
    this.get('attendance.relatedAttendances').addObject(ATTENDANCE(false, true, true, 'event 2'));

    await render(hbs`{{event-attendee attendance=attendance showRelatedEvents=showRelatedEvents}}`);

    assert.dom('.event-attendee').exists();
    assert.dom('.event-attendee-attended .checkin-button').hasText('Checked In');

    await click('.checkin-button');
    assert.dom('.event-attendee-attendances-row-0 .event-attendee-event-name').hasText('event 1');
    assert.dom('.event-attendee-attendances-row-0 .is-present-checkbox input').isNotChecked();

    assert.dom('.event-attendee-attendances-row-1 .event-attendee-event-name').hasText('event 2');
    assert.dom('.event-attendee-attendances-row-1 .is-present-checkbox input').isChecked();

    await click('.event-attendee-attendances-row-1 .is-present-checkbox');
    assert.dom('.event-attendee-attendances-row-1 .is-present-checkbox input').isNotChecked();
    assert.dom('.event-attendee-attended .checkin-button').hasText('Check In');
  });

  test('it renders attended past event', async function(assert) {
    this.set('attendance.attended', true);
    this.get('attendance.event').setProperties({
      isToday: false,
      hasEnded: true
    });
    await render(hbs`{{event-attendee attendance=attendance}}`);
    assert.dom('.event-attendee').exists();
    assert.dom('.event-attendee-attended .checkin-button').hasText('Attended');
  });

  test('it renders not attended past event', async function(assert) {
    this.get('attendance.event').setProperties({
      isToday: false,
      hasEnded: true
    });
    await render(hbs`{{event-attendee attendance=attendance}}`);
    assert.dom('.event-attendee').exists();
    assert.dom('.event-attendee-attended .checkin-button').hasText('Did Not Attend');
  });

  test('it renders attended future event', async function(assert) {
    this.set('attendance.attended', true);
    this.get('attendance.event').setProperties({
      isToday: false,
      hasEnded: false
    });
    await render(hbs`{{event-attendee attendance=attendance}}`);
    assert.dom('.event-attendee').exists();
    assert.dom('.event-attendee-attended .checkin-button').hasText('Checked In');
  });

  test('it renders not attended future event', async function(assert) {
    this.get('attendance.event').setProperties({
      isToday: false,
      hasEnded: false
    });
    await render(hbs`{{event-attendee attendance=attendance}}`);
    assert.dom('.event-attendee').exists();
    assert.dom('.event-attendee-attended .checkin-button').hasText('Check In');
  });
});
