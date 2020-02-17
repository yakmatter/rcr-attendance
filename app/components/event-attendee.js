import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed }  from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({
  tagName: '',
  session: service(),
  init() {
    this._super(...arguments);
    this.set('relatedCheckedIn', A(this.get('attendance.relatedAttendances')).mapBy('attended'));

  },
  isVisitingSkater: computed('event.teams.[]', 'attendance.skater.teams.[]', function() {
    const eventTeamIds = this.get('event').hasMany('teams').ids();
    const skaterTeamIds = this.get('attendance.skater').hasMany('teams').ids();

    return skaterTeamIds.every(skaterTeamId => eventTeamIds.includes(skaterTeamId) === false);
  }),
  markOffSkates: () => {},
  markAttendance: () => {},
  showRelatedEvents: () => {},
  isCheckedIn: computed('relatedCheckedIn', function() {
    return this.get('relatedCheckedIn').any(checkedIn => checkedIn === true);
  }),
  actions: {
    markAttendance(attendance, checked) {
      attendance.set('attended', checked);
      this.markAttendance(attendance);
      this.set('relatedCheckedIn', A(this.get('attendance.relatedAttendances')).mapBy('attended'));
    },
    markOffSkates(attendance, checked) {
      attendance.set('offSkates', checked);
      this.markOffSkates(attendance);
    },
    showRelatedEvents(attendance) {
      this.showRelatedEvents(attendance);
    }
  }
});
