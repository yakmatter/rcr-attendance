import Controller from '@ember/controller';
import moment from 'moment';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { alias }  from '@ember/object/computed';
import EmberObject from '@ember/object';
import { makeArray } from '@ember/array';

export default Controller.extend({
  store: service(),
  session: service(),
  event: alias('model'),
  attendances: computed('_attendances.[]', function() {
    return makeArray(this.get('_attendances')).sortBy('sortName');
  }),
  skaterIds: computed('_attendances.[]', function() {
    return makeArray(this.get('_attendances')).map(attendance => attendance.belongsTo('skater').id());
  }),
  searchString: null,
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
      const skaterIds = this.get('skaterIds');
      return this.store.query('skater', { '$search': value }).then(skaters => {
        return skaters.filter(skater => {
          return !skaterIds.includes(skater.id);
        });
      });
    },
    addSkater(skater) {
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
        this.get('_attendances').addObject(attendance);
        event.save();
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
      this.get('attendances').setEach('shouldShowRelatedEvents', false);
      attendance.toggleProperty('shouldShowRelatedEvents');
    }
  },
  loadContent() {
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
