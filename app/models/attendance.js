import DS from 'ember-data';
import { computed }  from '@ember/object';
import { reads }  from '@ember/object/computed';
import { isPresent }  from '@ember/utils';
import moment from 'moment';


const { Model, attr, belongsTo } = DS;

export default Model.extend({
  event: belongsTo('event'),
  skater: belongsTo('skater'),
  timeIn: attr('string'),
  timeOut: attr('string'),
  timestamp: attr('number'),
  eventStartTime: attr('string'),
  eventEndTime: attr('string'),
  offSkates: attr('boolean')
}).reopen({
  current: reads('event.hasStarted'),
  canonicalDay: computed('eventStartTime', function() {
    const eventStartTime = this.get('eventStartTime');
    let canonicalDay;

    if (eventStartTime) {
      canonicalDay = moment(eventStartTime).format('YYYY-MM-DD');
    }
    return canonicalDay;
  }),
  attended: computed('timeIn', 'timeOut', function() {
    return (isPresent(this.get('timeIn')) && isPresent(this.get('timeOut')));
  }),
  relatedAttendances: computed('skater.attendances', 'canonicalDay', function() {
    return this.get('skater.attendances');
  })
});
