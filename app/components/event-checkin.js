import Component from '@ember/component';
import moment from 'moment';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import EmberObject from '@ember/object';
import { makeArray } from '@ember/array';
import $ from 'jquery';

export default Component.extend({
  store: service(),
  session: service(),
  attendancesSorted: computed('attendances.[]', function() {
    return makeArray(this.get('attendances')).sortBy('sortName');
  }),
  skaterIds: computed('attendances.[]', function() {
    return makeArray(this.get('attendances')).map(attendance => attendance.belongsTo('skater').id());
  }),
  searchString: null,
  scrollToAttendance(skater) {
    const $element = $(`#${skater.id}`);

    this.get('attendances').forEach(attendance => {
      if (attendance.belongsTo('skater').id() === skater.id) {
        attendance.set('shouldShowRelatedEvents', true);
      }
    });

    $('.main-content').animate({
        scrollTop: $element.offset().top - 250
    }, 1000);
  },
  actions: {
    markAttendance(attendance) {
      const event = this.get('event');
      if (!attendance.attended) {
        attendance.set('timeIn', null);
        attendance.set('timeOut', null);
      }
      else {
        attendance.set('timeIn', event.get('startTime'));
        attendance.set('timeOut', event.get('endTime'));
      }
      attendance.set('timestamp', moment().format('x'));
      attendance.save();
    },
    markOffSkates(attendance) {
      attendance.set('timestamp', moment().format('x'));
      attendance.save();
    },
    skaterSearch(value) {
      // const skaterIds = this.get('skaterIds');
      return this.store.query('skater', { '$search': value }).then(skaters => {
        return skaters;
        // return skaters.filter(skater => {
        //   return !skaterIds.includes(skater.id);
        // });
      });
    },
    addSkater(skater) {
      const skaterIds = this.get('skaterIds');
      if (skaterIds.includes(skater.id)) {
        this.scrollToAttendance(skater);
        return;
      }

      const event = this.get('event');
      const attendance = this.store.createRecord('attendance', {
        skater: skater,
        event: event,
        startTime: event.get('startTime'),
        endTime: event.get('endTime'),
        timeIn: event.get('startTime'),
        timeOut: event.get('endTime'),
        timestamp: moment().format('x')
      });
      attendance.save().then(attendance => {
        attendance.set('sortName', `_${skater.get('displayName')}`);
        attendance.set('isGuestSkater', true);
        this.get('attendances').addObject(attendance);
        event.save();
        this.set('shouldShowUserSearch', false);
      });
    },
    deleteEvent(action) {
      if (action === 'delete') {
        const event = this.get('event');
        event.destroyRecord().then(() => {
          this.transitionToRoute('home.events');
        });
      }
    },
    showRelatedEvents(attendance) {
      this.get('attendancesSorted').setEach('shouldShowRelatedEvents', false);
      attendance.toggleProperty('shouldShowRelatedEvents');
    },
    toggleShouldShowUserSearch() {
      this.toggleProperty('shouldShowUserSearch');
    },
    addUnfoundSkater(skaterName) {
      const unfoundSkater = this.store.createRecord('skater', {
        name: 'SKATER NOT IN APEX',
        derbyName: skaterName,
        teams: [ this.get('event.teams.firstObject') ]
      });

      unfoundSkater.save().then(skater => {
        this.send('addSkater', skater);
      });
    }
  },
  init() {
    this._super(...arguments);
    this.set('dropdownOptions', [
      EmberObject.create({
        id: 'delete',
        label: 'Yes, Delete!'
      }),
      EmberObject.create({
        id: 'cancel',
        label: 'Cancel'
      }),
    ]);
  }
});
