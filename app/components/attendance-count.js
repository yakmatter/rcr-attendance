import Component from '@ember/component';
import { computed }  from '@ember/object';
import { filterBy }  from '@ember/object/computed';

export default Component.extend({
  label: 'Attended practices',
  showLabel: true,
  warnThreshold: 80,
  errorThreshold: 80,
  labelColor: computed('percentAttended', 'percentThreshold', function() {
    let labelColor = 'gray';
    const percentAttended = this.get('percentAttended');
    if (percentAttended < this.get('errorThreshold')) {
      labelColor = 'red';
    }
    else if (percentAttended < this.get('warnThreshold')) {
      labelColor = 'orange';
    }
    else if (percentAttended >= this.get('warnThreshold')) {
      labelColor = 'green';
    }
    return labelColor;
  }),
  currentAttendances: filterBy('attendances', 'current'),
  attended: filterBy('currentAttendances', 'attended'),
  percentAttended: computed('currentAttendances', 'attended', function() {
    const attended = this.get('attended.length');
    const currentAttendances = this.get('currentAttendances.length');

    return (attended / currentAttendances) * 100;
  }),
  formattedPercentAttended: computed('percentAttended', function() {
    return this.get('percentAttended').toFixed(0);
  })
});
