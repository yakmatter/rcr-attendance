import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed }  from '@ember/object';

export default Component.extend({
  tagName: '',
  session: service(),
  isVisitingSkater: computed('event.teams.[]', 'attendance.skater.teams.[]', function() {
    const eventTeamIds = this.get('event').hasMany('teams').ids();
    const skaterTeamIds = this.get('attendance.skater').hasMany('teams').ids();

    return skaterTeamIds.every(skaterTeamId => eventTeamIds.includes(skaterTeamId) === false);
  }),
  // attendanceCount: computed('event')
  actions: {
    markAttendance(attendance, checked) {
      attendance.set('attended', checked);
      this.markAttendance(attendance);
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
