import DS from 'ember-data';
import { computed }  from '@ember/object';
import { equal, reads } from '@ember/object/computed';
import moment from 'moment';
import { inject as service } from '@ember/service';

const { Model, attr, hasMany } = DS;

/* the number of minutes before an event to start checkin */
const NEXT_BUFFER_MINUTES = 20;

const TYPES = {
  SCRIMMAGE: 'scrimmage',
  PRACTICE: 'practice',
};

export default Model.extend({
  name: attr('string'),
  startTime: attr('date'),
  endTime: attr('date'),
  credits: attr('number'),
  type: attr('string'),
  teams: hasMany('team'),
  attendances: hasMany('attendance')
}).reopen({
  tick: service(),
  now: reads('tick.tick'),
  isScrimmage: equal('type', TYPES.SCRIMMAGE),
  isPractice: equal('type', TYPES.PRACTICE),
  hasStarted: computed('startTime', 'now', function() {
    return moment(this.get('startTime')).isSameOrBefore(this.get('now'));
  }),
  hasEnded: computed('endTime', 'now', function() {
    return moment(this.get('endTime')).isSameOrBefore(this.get('now'));
  }),
  isNow: computed('hasStarted', 'hasEnded', function() {
    return this.get('hasStarted') && !this.get('hasEnded');
  }),
  isReady: computed('startTime', 'now', function() {
    const diff = moment(this.get('startTime')).diff(this.get('now'), 'minutes');
    return diff > 0 && diff <= NEXT_BUFFER_MINUTES;
  }),
  isNext: computed('startTime', 'now', function() {
    const diff = moment(this.get('startTime')).diff(this.get('now'), 'minutes');
    return diff > 0 && diff <= 60;
  }),
  isToday: computed('startTime', 'now', function() {
    return (
      moment(this.get('startTime')).isSameOrBefore(this.get('now').endOf('day')) &&
      moment(this.get('startTime')).isSameOrAfter(this.get('now').startOf('day'))
    );
  })
});
